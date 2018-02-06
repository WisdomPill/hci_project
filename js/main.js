var width = window.innerWidth;
var height = window.innerHeight;

var tween = null;

function addProcess(layer, process_descriptor) {
    var process = new Konva.Label({
        x: process_descriptor.x,
        y: process_descriptor.y,
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
            x: 10,
            y: 100,
            text: 'example text',
            code: 'example code',
            color: '#38b735'
        },
        {
            height: 100,
            width: 300,
            x: 10,
            y: 300,
            text: 'example text',
            code: 'example code',
            color: '#3455b7'
        },
        {
            height: 100,
            width: 300,
            x: 10,
            y: 500,
            text: 'example text',
            code: 'example code',
            color: '#b72c35'
        }
    ],
    shadows: [
        {
            height: 100,
            width: 300,
            x: 400,
            y: 100
        },
        {
            height: 100,
            width: 300,
            x: 400,
            y: 300
        },
        {
            height: 100,
            width: 300,
            x: 400,
            y: 500
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

    descriptor.shadows.forEach(function (value) {
        addShadow(layer, value);
    })
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
            value.hide();
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
        shadowOffsetX: 5,
        shadowOffsetY: 5
    };

    var shadows = this.find('.shadow');

    var near_shadow = null;

    shadows.forEach(function (shadow) {
        if (is_near_destination(process, shadow)) {
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
    console.log(params);
    process.to(params);
});

function is_near_destination(process, shape) {
    var thresh = 50;
    var x = shape.attrs.x - process.attrs.x;
    var y = shape.attrs.y - process.attrs.y;
    return Math.sqrt(x * x + y * y) < thresh;
}
