var width = $('#container').width();
var height = window.innerHeight;

var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height
});

var layer = new Konva.Layer({});
var dragLayer = new Konva.Layer({});

stage.add(layer, dragLayer);

var rect1 = new Konva.Rect({
        x: 675,
        y: descriptorLevel1Starty + 50 * 4,
        height: 50,
        width: 50,
        fill: 'red',
        scale: {
            x: 1,
            y: 1
        },
        id: 'another_button'
    }
);
layer.add(rect1);
//
// var rect2 = new Konva.Rect({
//         x: 775,
//         y: descriptorLevel1Starty + 50 * 4,
//         height: 50,
//         width: 50,
//         fill: 'black',
//         scale: {
//             x: 1,
//             y: 1
//         },
//         id: 'popup_button'
//     }
// );
// layer.add(rect2);


var level_group = new Konva.Group({});
layer.add(level_group);
var processes_group = new Konva.Group({});
level_group.add(processes_group);
var shadows_group = new Konva.Group({});
level_group.add(shadows_group);
var lines_group = new Konva.Group({});
level_group.add(lines_group);
var pseudo_code_group = new Konva.Group({});
level_group.add(pseudo_code_group);
var hud_group = new Konva.Group({});
level_group.add(hud_group);

var popup_width = 500;
var popup_height = 400;

var popup_x = width / 2 - popup_width / 2;
var popup_y = height / 2 - popup_height / 2;
var popup_group = new Konva.Group({
    visible: false,
    x: popup_x,
    y: popup_y,
    id: 'popup'
});

var rectangle = new Konva.Rect({
    x: 0,
    y: 0,
    fill: 'green',
    height: popup_height,
    width: popup_width
});

popup_group.add(rectangle);

hud_group.add(popup_group);

load_descriptor(descriptorLevel1, processes_group, shadows_group, lines_group, pseudo_code_group);

stage.draw();
