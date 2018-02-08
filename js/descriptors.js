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
