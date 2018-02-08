//TODO remove this function as it is implemted only for debug purposes
function show_pseudo_codes(stage){
    var pseudo_codes = stage.find('.pseudo_code');

    pseudo_codes.forEach(function (pseudo_code) {
        var params = {
            duration: 0.5,
            easing: Konva.Easings.Linear,
            opacity: 1
        };
        pseudo_code.to(params);
    });
}

function hide_pseudo_codes(stage) {
    var pseudo_codes = stage.find('.pseudo_code');

    pseudo_codes.forEach(function (pseudo_code) {
        var params = {
            duration: 0.5,
            easing: Konva.Easings.Linear,
            opacity: 0
        };
        pseudo_code.to(params);
    });
}

function reposition_processes(stage) {
    var processes = stage.find('.process');
    processes.forEach(function (process) {
        var params = {
            duration: 0.5,
            easing: Konva.Easings.ElasticEaseOut,
            x: process.attrs.initial.x,
            y: process.attrs.initial.y
        };

        process.to(params);
    });
}

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

    descriptor.pseudo_code.forEach(function (pseudocode_descriptor) {
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
        name: 'pseudo_code',
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
