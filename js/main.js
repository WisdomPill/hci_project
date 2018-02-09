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
        x: 650,
        y: descriptorLevel1Starty,
        height: 50,
        width: 50,
        fill: 'cyan',
        opacity: 0.6,
        scale: {
            x: 1,
            y: 1
        },
        id: 'compile_button'
    }
));

layer.add(new Konva.Rect({
        x: 650,
        y: descriptorLevel1Starty + 50 *2,
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
        x: 675,
        y: descriptorLevel1Starty + 50 *4,
        height: 50,
        width: 50,
        fill: 'black',
        opacity: 0.6,
        scale: {
            x: 1,
            y: 1
        },
        rotation: 45,
        id: 'popup_button'
    }
));

layer.add(new Konva.Rect({
        x: 650,
        y: descriptorLevel1Starty + 50 *6,
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
        x: 650,
        y: descriptorLevel1Starty + 50 *8,
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
        x: 650,
        y: descriptorLevel1Starty + 50 *10,
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
layer.add(hud_group);

load_descriptor(descriptorLevel1, processes_group, shadows_group, lines_group, pseudo_code_group);

stage.add(layer, dragLayer);

