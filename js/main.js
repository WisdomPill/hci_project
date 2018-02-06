var descriptor = {
    error_message: '',
    background_img: '',
    processes: [
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 10,
            y: 100,
            text: 'example text',
            code: 'example code',
            color: '#38b735'
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 10,
            y: 300,
            text: 'example text',
            code: 'example code',
            color: '#3455b7'
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 10,
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
            shape: 'rectangle',
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
        y: 300,
        height: 50,
        width: 50,
        fill: 'yellow',
        opacity: 0.6,
        scale: {
            x: 1,
            y: 1
        },
        name: 'remove_me'
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

load_descriptor(descriptor);

stage.add(layer, dragLayer);

stage.on('click', function (evt) {
    var shape = evt.target;
    console.log(shape.attrs.name);
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

            processes.forEach(function (process) {
                var params = {
                    duration: 0.5,
                    easing: Konva.Easings.ElasticEaseOut,
                    x: process.attrs.initial.x,
                    y: process.attrs.initial.y
                };

                process.to(params);
            });
            this.draw();


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
            console.log('found near shadow');
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

function load_descriptor(descriptor) {
    descriptor.processes.forEach(function (process_descriptor) {
        addProcess(layer, process_descriptor);
    });

    descriptor.shadows.forEach(function (shadow_descriptor) {
        addShadow(layer, shadow_descriptor);
    })
}

function addProcess(layer, process_descriptor) {
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

    layer.add(process);
}

function addShadow(layer, shadow_descriptor) {
    var shadow = new Konva.Rect({
        x: shadow_descriptor.x,
        y: shadow_descriptor.y,
        height: shadow_descriptor.height,
        width: shadow_descriptor.width,
        fill: 'black',
        opacity: 0.6,
        name: 'shadow'
    });

    layer.add(shadow);
}

function is_near_matching_shadow(process, shadow) {
    var thresh = 50;
    var process_center = calculate_shape_center(process);
    console.log(process);
    console.log('process');
    console.log(process_center);
    var shadow_center = calculate_shape_center(shadow);
    console.log(shadow);
    console.log('shadow');
    console.log(shadow_center);
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
