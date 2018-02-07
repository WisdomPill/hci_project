var descriptor = {
    error_message: '',
    background_img: '',
    processes: [
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 30,
            y: 100,
            text: 'example text',
            code: 'example code',
            color: '#38b735'
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 30,
            y: 300,
            text: 'example text',
            code: 'example code',
            color: '#3455b7'
        },
        {
            shape: 'diamond',
            height: 50,
            width: 150,
            x: 30,
            y: 500,
            text: 'example text',
            code: 'example code',
            color: '#b72c35'
        }
    ],
    shadows: [
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 300,
            y: 100
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 300,
            y: 300
        },
        {
            shape: 'diamond',
            height: 50,
            width: 150,
            x: 300,
            y: 500
        }
    ],
    lines: [
        {
            start: {},
            end: {}
        }
    ],
    pseudocode: [
        {
            x: 600,
            y: 100,
            text: 'simpleText = new Konva.Text({})'
        },
        {
            x: 600,
            y: 300,
            text: 'simpleText = new Konva.Text({})'
        },
        {
            x: 600,
            y: 500,
            text: 'simpleText = new Konva.Text({})'
        }
    ]
};

var width = window.innerWidth;
var height = window.innerHeight;

var tween = null;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer({});
var dragLayer = new Konva.Layer({});

layer.add(new Konva.Rect({
        x: 1000,
        y: 100,
        height: 50,
        width: 50,
        fill: 'green',
        opacity: 0.6,
        scale: {
            x: 1,
            y: 1
        },
        id: 'reset_button'
    }
));

layer.add(new Konva.Rect({
        x: 1000,
        y: 200,
        height: 50,
        width: 50,
        fill: 'red',
        opacity: 0.6,
        scale: {
            x: 1,
            y: 1
        },
        id: 'remove_button'
    }
));

layer.add(new Konva.Rect({
        x: 1000,
        y: 300,
        height: 50,
        width: 50,
        fill: 'yellow',
        opacity: 0.6,
        scale: {
            x: 1,
            y: 1
        },
        id: 'text_button'
    }
));

layer.add(new Konva.Rect({
        x: 1000,
        y: 400,
        height: 50,
        width: 50,
        fill: 'blue',
        opacity: 0.6,
        scale: {
            x: 1,
            y: 1
        },
        name: 'remove_me'
    }
));

level_group = new Konva.Group({});
layer.add(level_group);
processes_group = new Konva.Group({});
level_group.add(processes_group);
shadows_group = new Konva.Group({});
level_group.add(shadows_group);
pseudocode_group = new Konva.Group({});
level_group.add(pseudocode_group);

load_descriptor(descriptor, processes_group, shadows_group, pseudocode_group);

stage.add(layer, dragLayer);

stage.on('click', function (evt) {
    var shape = evt.target;
    switch (shape.attrs.id) {
        case 'remove_button':

            var to_remove = this.find('.remove_me');

            to_remove.forEach(function (value) {
                value.destroy();
            });
            this.draw();

            break;
        case 'reset_button':

            var processes = this.find('.process');
            var show_pseudocodes = this.find('.pseudocode');

            processes.forEach(function (process) {
                var params = {
                    duration: 0.5,
                    easing: Konva.Easings.ElasticEaseOut,
                    x: process.attrs.initial.x,
                    y: process.attrs.initial.y
                };

                process.to(params);
            });

            show_pseudocodes.forEach(function (pseudocodes){
                pseudocodes.opacity(0);
            });

            this.draw();

            break;
        case 'text_button':

            var show_pseudocodes = this.find('.pseudocode');

            var offset = 0;

            show_pseudocodes.forEach(function (pseudocodes){
                offset+=0.5;
                var params = {
                    duration: offset,
                    easing: Konva.Easings.Linear,
                    opacity: 1

                };
                pseudocodes.to(params);

            });


            break;

        default:
            break;
    }
});

stage.on('dragstart', function (evt) {
    var shape = evt.target;
    // moving to another layer will improve dragging performance
    shape.moveTo(dragLayer);
    stage.draw();

    if (tween) {
        tween.pause();
    }
    shape.to({
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseIn,
        scale: 1,
        shadowOffset: {
            x: 15,
            y: 15
        }
    });
});

stage.on('dragend', function (evt) {
    var process = evt.target;
    process.moveTo(layer);
    stage.draw();
    var params = {
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scale: 1,
        shadowOffset: {
            x: 5,
            y: 5
        }
    };

    var shadows = this.find('.shadow');

    var near_shadow = null;

    shadows.forEach(function (shadow) {
        if (is_near_matching_shadow(process, shadow)) {
            near_shadow = shadow;
        }
    });

    if (near_shadow == null) {
        params.x = process.attrs.initial.x;
        params.y = process.attrs.initial.y;
    } else {
        params.x = near_shadow.attrs.x;
        params.y = near_shadow.attrs.y;
    }
    process.to(params);
});

function load_descriptor(descriptor, processes_group, shadows_group, pseudocode_group) {
    descriptor.processes.forEach(function (process_descriptor) {
        addProcess(processes_group, process_descriptor);
    });

    descriptor.shadows.forEach(function (shadow_descriptor) {
        addShadow(shadows_group, shadow_descriptor);
    });

    descriptor.pseudocode.forEach(function (pseudocode_descriptor) {
        addPseudocode(pseudocode_group, pseudocode_descriptor);
    })
}

function addProcess(processes_group, process_descriptor) {
    var process_group = new Konva.Group({});

    var y = process_descriptor.y;
    var x = process_descriptor.x;
    var width = process_descriptor.width;
    var height = process_descriptor.height;
    var process = null;
    if (process_descriptor.shape === 'diamond') {
        var half_height = height / 2;
        var half_width = width / 2;
        process = new Konva.Line({
            points: [x, y + half_height, x + half_width, y, x + width, y + half_height, x + half_width, y + height],
            // x: x,
            // y: y,
            height: height,
            width: width,
            closed: true,
            fill: 'black',
            opacity: 0.6,
            name: 'process'
        });
    } else {
        process = new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: 'black',
            opacity: 0.6,
            name: 'process'
        });
    }


    var process = new Konva.Label({
        x: process_descriptor.x,
        y: process_descriptor.y,
        height: process_descriptor.height,
        width: process_descriptor.width,
        name: 'process',
        draggable: true,
        // custom attribute
        initial: {
            x: process_descriptor.x,
            y: process_descriptor.y
        }
    });

    process.add(new Konva.Tag({
        fill: process_descriptor.color,
        opacity: 0.8,
        shadowColor: 'black',
        shadowBlur: 10,
        shadowOffset: {
            x: 5,
            y: 5
        },
        shadowOpacity: 0.6
    }));

    process.add(new Konva.Text({
        text: process_descriptor.text,
        align: 'center',
        fontFamily: 'Calibri',
        fontSize: 18,
        fill: 'black',
        height: process_descriptor.height,
        width: process_descriptor.width
    }));

    processes_group.add(process);
}

function addShadow(shadows_group, shadow_descriptor) {
    var shadow_group = new Konva.Group({});

    var y = shadow_descriptor.y;
    var x = shadow_descriptor.x;
    var width = shadow_descriptor.width;
    var height = shadow_descriptor.height;
    var shadow = null;
    if (shadow_descriptor.shape === 'diamond') {
        var half_height = height / 2;
        var half_width = width / 2;
        shadow = new Konva.Line({
            points: [x, y + half_height, x + half_width, y, x + width, y + half_height, x + half_width, y + height],
            // x: x,
            // y: y,
            height: height,
            width: width,
            closed: true,
            fill: 'black',
            opacity: 0.3,
            name: 'shadow'
        });
    } else {
        shadow = new Konva.Rect({
            x: x,
            y: y,
            height: height,
            width: width,
            fill: 'black',
            opacity: 0.3,
            name: 'shadow'
        });
    }

    shadows_group.add(shadow);
}

function addPseudocode(pseudocode_group, pseudocode_descriptor) {

    var simpleText = new Konva.Text({
        x: pseudocode_descriptor.x,
        y: pseudocode_descriptor.y,
        text: pseudocode_descriptor.text,
        name: 'pseudocode',
        fontSize: 18,
        fontFamily: 'Menlo',
        fill: 'black',
        opacity: 0
    });

    console.log(simpleText.getAbsoluteOpacity());

    pseudocode_group.add(simpleText);

}

function is_near_matching_shadow(process, shadow) {
    var thresh = 50;
    var process_center = calculate_shape_center(process);
    var shadow_center = calculate_shape_center(shadow);
    var x = shadow_center.x - process_center.x;
    var y = shadow_center.y - process_center.y;
    return Math.sqrt(x * x + y * y) < thresh;
}

function calculate_shape_center(shape) {
    return {
        x: shape.attrs.x + shape.attrs.width / 2,
        y: shape.attrs.y + shape.attrs.height / 2
    }
}
