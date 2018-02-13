var y_offset = 10;
var descriptors = [
    {
        error_message: '',
        background_img: '',
        processes: [
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset,
                text: 'Pour water in the glass',
                color: '#68d554'
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset + 50 * 2,
                text: 'Put the tea bag into the glass',
                color: '#68d554'
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset + 50 * 4,
                text: 'Fill the pot with water',
                color: '#68d554'
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset + 50 * 6,
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
                y: y_offset,
                right_answer: 2
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 300,
                y: y_offset + 50 * 2,
                right_answer: 3
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 300,
                y: y_offset + 50 * 4,
                right_answer: 0
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 300,
                y: y_offset + 50 * 6,
                right_answer: 1
            }
        ],
        arrows: [
            {
                x: 375,
                y: y_offset + 50,
                points: [0, 5, 0, 42]
            },
            {
                x: 375,
                y: y_offset + 50 * 3,
                points: [0, 5, 0, 42]
            },
            {
                x: 375,
                y: y_offset + 50 * 5,
                points: [0, 5, 0, 42]
            }
        ],
        pseudo_code: [
            {
                x: 500,
                y: y_offset,
                text: 'pot.fill(water)'
            },
            {
                x: 500,
                y: y_offset + 50 * 2,
                text: 'pot.warm()'
            },
            {
                x: 500,
                y: y_offset + 50 * 4,
                text: 'glass.pour(pot.contents)'
            },
            {
                x: 500,
                y: y_offset + 50 * 6,
                text: 'glass.add(tea_bags)'
            }
        ]
    },
    {
        error_message: 'you didn\'t turn the light on and hurt your left pinky!',
        background_img: 'Congrats, you have won!',
        processes: [

            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset + 50 * 4,
                text: 'turn on the light',
                color: '#68d554'
            },
            {
                shape: 'diamond',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset + 50 * 2,
                text: 'is it dark?',
                color: '#68d554'
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset,
                text: 'do nothing',
                color: '#68d554'
            }
        ],
        shadows: [
            {
                shape: 'diamond',
                height: 50,
                width: 150,
                x: 375,
                y: y_offset,
                right_answer: 1
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 250,
                y: y_offset + 50 * 4,
                right_answer: 0
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 500,
                y: y_offset + 50 * 4,
                right_answer: 2
            }
        ],
        arrows: [
            {
                x: 525,
                y: y_offset + 25,
                points: [5, 0, 50, 0, 50, 168]
            },
            {
                x: 375,
                y: y_offset + 25,
                points: [-5, 0, -50, 0, -50, 168]
            }
        ],
        pseudo_code: [
            {
                x: 700,
                y: y_offset,
                text: 'if(house.dark) then'
            },
            {
                x: 700,
                y: y_offset + 50 * 3,
                text: '{light.on }\n else \n{ wait(60);}'
            }
        ]
    },
    {
        error_message: 'you didn\'t do wash your clothes, and now you have to wear them dirty',
        background_img: 'Congrats, you have won!',
        processes: [
            {
                shape: 'diamond',
                height: 86,
                width: 170,
                x: 25,
                y: y_offset + 345,
                text: 'c\'è spazio in lavatrice?',
                color: '#68d554'
            },
            {
                shape: 'diamond',
                height: 86,
                width: 170,
                x: 25,
                y: y_offset + 450,
                text: 'ci sono altri vestiti?',
                color: '#68d554'
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset,
                text: 'prendi un vestito dalle cesta ',
                color: '#68d554'
            },

            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset + 90 * 3,
                text: 'riponi il vestito nella cesta',
                color: '#68d554'
            },

            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset + 90 * 2,
                text: 'metti il vestito in lavatrice',
                color: '#68d554'
            },

            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 30,
                y: y_offset + 90,
                text: 'fai partire la lavatrice',
                color: '#68d554'
            }
        ],
        shadows: [
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 390,
                y: y_offset,
                right_answer: 2
            },

            {
                shape: 'diamond',
                height: 86,
                width: 170,
                x: 385,
                y: y_offset + 70,
                right_answer: 0
            },

            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 250,
                y: y_offset + 50 * 4,
                right_answer: 3
            },

            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 540,
                y: y_offset + 50 * 4,
                right_answer: 4
            },
            {
                shape: 'diamond',
                height: 86,
                width: 170,
                x: 530,
                y: y_offset + 300,
                right_answer: 1
            },
            {
                shape: 'rectangle',
                height: 50,
                width: 150,
                x: 390,
                y: y_offset + 50 * 8 + 18,
                right_answer: 5
            }
        ],
        arrows: [
            {
                x: 552,
                y: y_offset + 43 + 70,
                points: [5, 0, 62, 0, 62, 80]
            },
            {
                x: 388,
                y: y_offset + 43 + 70,
                points: [-5, 0, -62, 0, -62, 80]
            }
            ,
            {
                x: 470,
                y: y_offset + 47,
                points: [0, 5, 0, 18]
            }
            ,
            {
                x: 328,
                y: y_offset + 43 + 70 + 50,
                points: [0, 90, 0, 280, 55, 280]
            }
            ,
            {
                x: 707,
                y: y_offset + 343,
                points: [0, 0, 50, 0, 50, -315, -160, -315]
            }
            ,
            {
                x: 610,
                y: y_offset + 252,
                points: [5, 0, 5, 41]
            }
            ,
            {
                x: 610,
                y: y_offset + 390,
                points: [5, 0, 5, 55, -63, 55]
            }
        ],
        pseudo_code: [
            {
                x: 770,
                y: y_offset,
                text: 'funct WashingMachine()\n  {vestito.taken=true'
            },
            {
                x: 770,
                y: y_offset + 50 * 2,
                text: 'while(lavatrice.full()==false) {'
            },
            {
                x: 770,
                y: y_offset + 50 * 4,
                text: 'lavatrice.insert(vestito) \n vestito.taken=false \n'
            },
            {
                x: 770,
                y: y_offset + 50 * 6,
                text: 'if(cesta.empty()==false)\n then{'
            },
            {
                x: 770,
                y: y_offset + 330,
                text: 'WashingMachine()} \n }'
            },

            {
                x: 770,
                y: y_offset + 50 * 9,
                text: 'lavatrice.start}'
            }
        ]
    }
];
