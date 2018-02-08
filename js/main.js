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
            text: 'Sono verde',
            color: '#38b735'
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 30,
            y: 300,
            text: 'Io blu',
            color: '#3455b7'
        },
        {
            shape: 'diamond',
            height: 50,
            width: 150,
            x: 30,
            y: 500,
            text: 'Io sono rosso!',
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
            x: 375,
            y: 150,
            points: [0, 5, 0, 140]
        },
        {
            x: 375,
            y: 350,
            points: [0, 5, 0, 140]
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
lines_group = new Konva.Group({});
level_group.add(lines_group);
pseudocode_group = new Konva.Group({});
level_group.add(pseudocode_group);

load_descriptor(descriptor, processes_group, shadows_group, lines_group, pseudocode_group);

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
            processes.forEach(function (process) {
                var params = {
                    duration: 0.5,
                    easing: Konva.Easings.ElasticEaseOut,
                    x: process.attrs.initial.x,
                    y: process.attrs.initial.y
                };

                process.to(params);
            });

            hide_pseudo_codes(this);

            break;
        case 'text_button':

            hide_pseudo_codes(this);

            break;


        default:
            break;
    }
});

stage.on('dragstart', function (evt) {
    var group = evt.target;
    group.moveTo(dragLayer);
    stage.draw();

    group.children.forEach(function (value) {
        var params = {
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            scaleX: 1.2,
            scaleY: 1.2,
            shadowOffsetX: 15,
            shadowOffsetY: 15,
            onFinish: function () {
                console.log('finished drag start');
                console.log(value.getAbsoluteScale());
            }
        };
        value.to(params);
    });
});

stage.on('dragend', function (evt) {
    var group = evt.target;
    group.moveTo(layer);
    stage.draw();

    var shadows = this.find('.shadow');

    var near_shadow = null;

    shadows.forEach(function (shadow) {
        if (is_near_matching_shadow(group, shadow)) {
            near_shadow = shadow;
        }
    });

    var group_params = {
        duration: 0.5,
        easing: Konva.Easings.BounceEaseOut,
        x: 0,
        y: 0
    };

    if (near_shadow == null) {
        group_params.x = group.attrs.initial.x;
        group_params.y = group.attrs.initial.y;
    } else {
        group_params.x = near_shadow.attrs.x;
        group_params.y = near_shadow.attrs.y;
    }

    group.to(group_params);

    group.children.forEach(function (value) {
        var params = {
            duration: 0.5,
            easing: Konva.Easings.BounceEaseOut,
            scaleX: 1,
            scaleY: 1,
            shadowOffsetX: 5,
            shadowOffsetY: 5,
            onFinish: function () {
                console.log('finished drag end');
            }
        };
        value.to(params);
    });
});

function hide_pseudo_codes(stage) {
    var pseudo_codes = stage.find('.pseudocode');

    pseudo_codes.forEach(function (pseudo_code) {
        var params = {
            duration: 0.5,
            easing: Konva.Easings.Linear,
            opacity: 1
        };
        pseudo_code.to(params);
    });
}

stage.on('mouseenter', function (evt) {
    var processes = evt.target;
    if (processes.parent.attrs.name == 'process')
        stage.container().style.cursor = 'pointer';
});

stage.on('mouseleave', function (evt) {
    var processes = evt.target;
    if (processes.parent.attrs.name == 'process')
        stage.container().style.cursor = 'default';
});

function load_descriptor(descriptor, processes_group, shadows_group, lines_group, pseudocode_group) {
    descriptor.processes.forEach(function (process_descriptor) {
        add_process(processes_group, process_descriptor);
    });

    descriptor.shadows.forEach(function (shadow_descriptor) {
        add_shadow(shadows_group, shadow_descriptor);
    });

    descriptor.lines.forEach(function (lines_descriptor) {
        add_lines(lines_group, lines_descriptor);
    });

    descriptor.pseudocode.forEach(function (pseudocode_descriptor) {
        add_pseudo_code(pseudocode_group, pseudocode_descriptor);
    })
}

function add_process(group, descriptor) {
    var y = descriptor.y;
    var x = descriptor.x;
    var width = descriptor.width;
    var height = descriptor.height;

    var shape = descriptor.shape;
    var inner_group = new Konva.Group({
        x: x,
        y: y,
        width: width,
        height: height,
        initial: {
            x: descriptor.x,
            y: descriptor.y
        },
        name: 'process',
        shape: shape,
        draggable: true
    });

    if (shape === 'diamond') {
        var half_height = height / 2;
        var half_width = width / 2;
        inner_group.add(new Konva.Line({
                points: [0, half_height, half_width, 0, width, half_height, half_width, height],
                // x: x,
                // y: y,
                height: height,
                width: width,
                closed: true,
                fill: descriptor.color,
                opacity: 0.8,
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowOpacity: 0.6,
                scaleX: 1,
                scaleY: 1
            }
        ));
    } else {
        inner_group.add(new Konva.Rect({
                x: 0,
                y: 0,
                height: height,
                width: width,
                fill: descriptor.color,
                opacity: 0.8,
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowOpacity: 0.6,
                scaleX: 1,
                scaleY: 1
            }
        ));
    }

    inner_group.add(new Konva.Text({
            x: 0,
            y: 0,
            height: height,
            width: width,
            text: descriptor.text,
            align: 'center',
            fontFamily: 'Calibri',
            fontSize: 18,
            fill: 'black',
            scaleX: 1,
            scaleY: 1
        }
    ));

    group.add(inner_group);
}

function add_shadow(group, descriptor) {
    var y = descriptor.y;
    var x = descriptor.x;
    var width = descriptor.width;
    var height = descriptor.height;

    var inner_group = new Konva.Group({
        x: x,
        y: y,
        width: width,
        height: height,
        name: 'shadow',
        shape: descriptor.shape
    });

    if (descriptor.shape === 'diamond') {
        var half_height = height / 2;
        var half_width = width / 2;
        inner_group.add(new Konva.Line({
                points: [0, half_height, half_width, 0, width, half_height, half_width, height],
                // x: x,
                // y: y,
                height: height,
                width: width,
                closed: true,
                fill: 'black',
                opacity: 0.3
            }
        ));
    } else {
        inner_group.add(new Konva.Rect({
                x: 0,
                y: 0,
                height: height,
                width: width,
                fill: 'black',
                opacity: 0.3
            }
        ));
    }

    group.add(inner_group);
}

function add_lines(group, descriptor) {
    var y = descriptor.y;
    var x = descriptor.x;

    var inner_group = new Konva.Group({
        x: x,
        y: y
    });

    var line = new Konva.Arrow({
        points: descriptor.points,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4
    });

    inner_group.add(line);

    group.add(inner_group);
}

function add_pseudo_code(group, descriptor) {

    var y = descriptor.y;
    var x = descriptor.x;

    var inner_group = new Konva.Group({
        x: x,
        y: y
    });

    var pseudo_code = new Konva.Text({
        x: 0,
        y: 0,
        text: descriptor.text,
        name: 'pseudocode',
        fontSize: 18,
        fontFamily: 'Menlo',
        fill: 'black',
        opacity: 0
    });

    inner_group.add(pseudo_code);

    group.add(inner_group);

}

function is_near_matching_shadow(process, shadow) {
    var thresh = 50;
    var process_center = calculate_shape_center(process);
    var shadow_center = calculate_shape_center(shadow);
    var x = shadow_center.x - process_center.x;
    var y = shadow_center.y - process_center.y;
    return Math.sqrt(x * x + y * y) < thresh && process.attrs.shape === shadow.attrs.shape;
}

function calculate_shape_center(shape) {
    return {
        x: shape.attrs.x + shape.attrs.width / 2,
        y: shape.attrs.y + shape.attrs.height / 2
    }
}
