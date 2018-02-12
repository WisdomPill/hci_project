var descriptor =
    {
    error_message: '',
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
    arrows: [
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
    pseudo_code: [
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

var descriptorLevel1Starty = 20;
var descriptorLevel1 = {
    error_message: '',
    background_img: '',
    processes: [
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 30,
            y: descriptorLevel1Starty,
            text: 'Pour water in the glass',
            color: '#68d554'
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 30,
            y: descriptorLevel1Starty + 50 * 2,
            text: 'Put the tea bag into the glass',
            color: '#68d554'
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 30,
            y: descriptorLevel1Starty + 50 * 4,
            text: 'Fill the pot with water',
            color: '#68d554'
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 30,
            y: descriptorLevel1Starty + 50 * 6,
            text: 'Warm the pot',
            color: '#68d554'
        }
    ],
    shadows: [
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 300,
            y: descriptorLevel1Starty,
            right_answer: 2
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 300,
            y: descriptorLevel1Starty + 50 * 2,
            right_answer: 3
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 300,
            y: descriptorLevel1Starty + 50 * 4,
            right_answer: 0
        },
        {
            shape: 'rectangle',
            height: 50,
            width: 150,
            x: 300,
            y: descriptorLevel1Starty + 50 * 6,
            right_answer: 1
        }
    ],
    arrows: [
        {
            x: 375,
            y: descriptorLevel1Starty + 50,
            points: [0, 5, 0, 42]
        },
        {
            x: 375,
            y: descriptorLevel1Starty + 50 * 3,
            points: [0, 5, 0, 42]
        },
        {
            x: 375,
            y: descriptorLevel1Starty + 50 * 5,
            points: [0, 5, 0, 42]
        }
    ],
    pseudo_code: [
        {
            x: 500,
            y: descriptorLevel1Starty,
            text: 'pot.fill(water)'
        },
        {
            x: 500,
            y: descriptorLevel1Starty + 50 * 2,
            text: 'pot.warm()'
        },
        {
            x: 500,
            y: descriptorLevel1Starty + 50 * 4,
            text: 'glass.pour(pot.contents)'
        },
        {
            x: 500,
            y: descriptorLevel1Starty + 50 * 6,
            text: 'glass.add(tea_bags)'
        }
    ]
};

