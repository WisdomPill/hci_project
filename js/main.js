var width = window.innerWidth;
var height = window.innerHeight;

var tween = null;

function addProcess(layer, descriptor) {
    var scale = 1;

    var process_shadow = new Konva.Rect({
        x: descriptor.final.x,
        y: descriptor.final.y,
        height: descriptor.height,
        width: descriptor.width,
        fill: 'black',
        opacity: 0.6,
        scale: {
            x: scale,
            y: scale
        },
        name: 'shadow'

    });

    layer.add(process_shadow);

    var process = new Konva.Label({
        x: descriptor.initial.x,
        y: descriptor.initial.y,
        draggable: true,
        scale: {
            x: scale,
            y: scale
        },
        // custom attribute
        startScale: scale,
        final: descriptor.final,
        initial: descriptor.initial
    });

    process.add(new Konva.Tag({
        fill: descriptor.color,
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
        text: descriptor.text,
        align: 'center',

        fontFamily: 'Calibri',
        fontSize: 18,
        fill: 'black',
        height: descriptor.height,
        width: descriptor.width
    }));

    layer.add(process);
}

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer();
var dragLayer = new Konva.Layer();

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

var obj = new Konva.Rect({
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
        name: 'remove_button'
    }
);
layer.add(obj);

var descriptor = {
    error_message: '',
    background_img: '',
    processes: [
        {
            height: 100,
            width: 300,
            cornerRadius: 10,
            initial: {
                x: 10,
                y: 100
            },
            final: {
                x: 400,
                y: 100
            },
            text: 'example text',
            code: 'example code',
            color: '#38b735'
        },
        {
            height: 100,
            width: 300,
            cornerRadius: 10,
            initial: {
                x: 10,
                y: 300
            },
            final: {
                x: 400,
                y: 300
            },
            text: 'example text',
            code: 'example code',
            color: '#3455b7'
        },
        {
            height: 100,
            width: 300,
            cornerRadius: 10,
            initial: {
                x: 10,
                y: 500
            },
            final: {
                x: 400,
                y: 500
            },
            text: 'example text',
            code: 'example code',
            color: '#b72c35'
        }
    ],
    lines: [
        {
            initial: {},
            final: {}
        }
    ]
};

function load_descriptor(descriptor) {
    descriptor.processes.forEach(function (value) {
        addProcess(layer, value);
    });
}

load_descriptor(descriptor);

stage.add(layer, dragLayer);

stage.on('click', function (evt) {
    var shape = evt.target;
    console.log(shape.attrs.name);
    if (shape.attrs.name === 'remove_button') {
        var to_remove = this.find('.remove_me');

        console.log(to_remove);

        to_remove.forEach(function (value) {
            value.destroy();
        });
        this.draw();
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
        scale: {
            x: shape.getAttr('startScale') * 1.2,
            y: shape.getAttr('startScale') * 1.2
        },
        shadowOffset: {
            x: 15,
            y: 15
        }
    });
});

stage.on('dragend', function (evt) {
    var shape = evt.target;
    shape.moveTo(layer);
    stage.draw();
    var params = {
        duration: 0.5,
        easing: Konva.Easings.ElasticEaseOut,
        scaleX: shape.getAttr('startScale'),
        scaleY: shape.getAttr('startScale'),
        shadowOffsetX: 5,
        shadowOffsetY: 5
    };

    console.log(shape);

    if (!is_near_destination(shape)) {
        params.x = shape.attrs.initial.x;
        params.y = shape.attrs.initial.y;
    } else {
        params.x = shape.attrs.final.x;
        params.y = shape.attrs.final.y;
    }
    console.log(params);
    shape.to(params);
});

function is_near_destination(shape) {
    var x = shape.attrs.final.x - shape.attrs.x;
    var y = shape.attrs.final.y - shape.attrs.y;
    return Math.sqrt(x * x + y * y) < 50;
}
