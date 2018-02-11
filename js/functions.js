//TODO remove this function as it is implemted only for debug purposes
function show_pseudo_codes(stage) {
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
    descriptor.processes.forEach(function (process_descriptor, index) {
        add_process(processes_group, process_descriptor, index);
    });

    descriptor.shadows.forEach(function (shadow_descriptor, index) {
        add_shadow(shadows_group, shadow_descriptor, index);
    });

    descriptor.arrows.forEach(function (arrow_descriptor) {
        add_arrow(lines_group, arrow_descriptor);
    });

    descriptor.pseudo_code.forEach(function (pseudo_code_descriptor, index) {
        add_pseudo_code(pseudocode_group, pseudo_code_descriptor, index);
    })
}

function add_process(group, descriptor, index) {
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
        index: index,
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
            y: (height / 2) - ((descriptor.text.length > 21) ? 13 : 6),
            height: height,
            width: width,
            text: descriptor.text,
            align: 'center',
            fontFamily: 'Salsa',
            fontSize: 13,
            fill: 'black',
            scaleX: 1,
            scaleY: 1
        }
    ));
    group.add(inner_group);
}

function add_shadow(group, descriptor, index) {
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
        answered: false,
        right: false,
        index: index,
        shape: descriptor.shape,
        right_answer: descriptor.right_answer,
        initial_position: {
            x: x,
            y: y
        }
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
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowOpacity: 0.6,
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
                shadowColor: 'black',
                shadowBlur: 10,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                shadowOpacity: 0.6,
                opacity: 0.3
            }
        ));
    }

    group.add(inner_group);
}

function add_arrow(group, descriptor) {
    var y = descriptor.y;
    var x = descriptor.x;

    var inner_group = new Konva.Group({
        x: x,
        y: y
    });

    var arrow = new Konva.Arrow({
        points: descriptor.points,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 4
    });

    inner_group.add(arrow);

    group.add(inner_group);
}

function add_pseudo_code(group, descriptor, index) {
    var y = descriptor.y;
    var x = descriptor.x;

    var inner_group = new Konva.Group({
        x: x,
        y: y,
        index: index
    });

    var pseudo_code = new Konva.Text({
        x: 0,
        y: 0,
        text: descriptor.text,
        name: 'pseudo_code',
        fontSize: 10,
        fontFamily: 'Menlo',
        fill: 'black',
        opacity: 0
    });

    inner_group.add(pseudo_code);

    group.add(inner_group);
}

function update_answers(stage) {
    // console.log(stage);
    var processes = stage.find('.process');
    var shadows = stage.find('.shadow');

    // processes.forEach(function (process, index) {
    //     if (is_right_answer(shadows[index], process)) {
    //         shadows[index].attrs.answered = true;
    //     }
    // });

    // processes.forEach(function (process, index) {
    //     console.log('Process ' + process.children[1].attrs.text + ' with index ' + index + ' foreach and index '
    //         + process.attrs.index);
    // });


    shadows.forEach(function (shadow, shadows_index, shadows_array) {
        shadows_array[shadows_index].attrs.answered = false;
        // console.log('Right answer index ' + shadow.attrs.right_answer);
        processes.forEach(function (process, processes_index) {
            if (same_position(process, shadow)) {
                shadows_array[shadows_index].attrs.answered = true;
            }
            if (processes_index === shadow.attrs.right_answer) {
                // console.log('process_index is the same as rhe shadow right_answer index');
                shadows_array[shadows_index].attrs.right = same_position(shadow, process);
            }
        });
        // console.log('Shadow with index ' + shadows_index + ' foreach and index ' + shadow.attrs.index
        //     + ' answered ' + shadow.attrs.answered + ' right ' + shadow.attrs.right);
    });

    // shadows.forEach(function (shadow, index) {
    //     console.log('Shadow with index ' + index + ' foreach and index ' + shadow.attrs.index
    //         + ' answered ' + shadow.attrs.answered + ' right ' + shadow.attrs.right);
    // });
}

function compile_level(stage) {
    var shadows = stage.find('.shadow');
    var pseudo_codes = stage.find('.pseudo_code');

    var answered_all_shadows = true;

    shadows.forEach(function (shadow) {
        if (!shadow.attrs.answered) {
            answered_all_shadows = false;
            var duration = 500;
            var target = new Date();
            target.setMilliseconds(target.getMilliseconds() + duration);
            var delta = target - new Date();
            var stop = false;

            var animation = new Konva.Animation(function (frame) {
                var t = 1 - (target - new Date()) / delta;

                if (t > 1) {
                    stop = true;
                    t = 1;
                }

                var periodicity = 5;
                var displacement = 5;
                var initial_x = shadow.attrs.initial_position.x;
                shadow.setX(initial_x + Math.sin(t * Math.PI * 2 * periodicity) * displacement);
                if (stop) {
                    animation.stop();
                }
            }, layer);

            animation.start();
        }
    });

    if (answered_all_shadows) {
        var params = {
            duration: 0.5,
            easing: Konva.Easings.Linear,
            opacity: 1,
            onFinish: function () {
                if (shadows[1].attrs.right) {
                    pseudo_codes[1].to(get_parameters_for_next_pseudo_codes(pseudo_codes, 1, shadows));
                } else {
                    // next block is in the wrong spot
                    console.log('next process is in the wrong spot');
                }
            }
        };

        if (shadows[0].attrs.right) {
            pseudo_codes[0].to(params);
        }
    }
}

function get_parameters_for_next_pseudo_codes(pseudo_codes, index, shadows) {
    return {
        duration: 0.5,
        easing: Konva.Easings.Linear,
        opacity: 1,
        onFinish: function () {
            if (index > 0 && index + 1 < pseudo_codes.length) {
                console.log(shadows);
                console.log(shadows[index + 1]);
                if (shadows[index + 1].attrs.right) {
                    pseudo_codes[index + 1].to(get_parameters_for_next_pseudo_codes(pseudo_codes, index + 1, shadows));
                } else {
                    // next block is in the wrong spot
                    console.log('next process is in the wrong spot');
                }
            } else if (index + 1 === pseudo_codes.length) {
                // win game
                console.log('congrats you won');
            }
        }
    }
}

function same_position(shadow, process) {
    var same_x = process.attrs.x === shadow.attrs.x;
    var same_y = process.attrs.y === shadow.attrs.y;

    return same_x && same_y;
}

function is_near_matching_shadow(process, shadow) {
    var thresh = 50;
    var process_center = calculate_shape_center(process);
    var shadow_center = calculate_shape_center(shadow);
    var x = shadow_center.x - process_center.x;
    var y = shadow_center.y - process_center.y;
    return Math.sqrt(x * x + y * y) < thresh && process.attrs.shape === shadow.attrs.shape && !shadow.attrs.answered;
}

function calculate_shape_center(shape) {
    return {
        x: shape.attrs.x + shape.attrs.width / 2,
        y: shape.attrs.y + shape.attrs.height / 2
    }
}
