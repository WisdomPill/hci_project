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

            reposition_processes(this);

            hide_pseudo_codes(this);

            break;
        case 'text_button':

            show_pseudo_codes(this);

            break;

        case 'compile_button':

            var shadows = this.find('.shadow');
            var rightAnswerNumber = 0;

            shadows.forEach(function (value, index) {
                if (!value.attrs.answered) {
                    console.log('Shadow ' + value.index + ' does not have an answer');
                } else{
                    console.log('Shadow ' + value.index + ' have an answer!');
                }
                if (!value.attrs.right) {
                    console.log('Shadow ' + value.index + ' does not have the right answer');
                } else {
                    rightAnswerNumber++;
                    console.log('Shadow ' + value.index + ' have the right answer!');
                }
            });
            if (rightAnswerNumber == shadows.length){
                stage.fire('click', {target : {attrs: {id: 'text_button'}}});
                console.log('livello completato')
            } 
            break;
        case 'popup_button':

            var shadows = this.find('.shadow');

            var f = 'position';

            var duration = 500;

            var target = new Date();
            target.setMilliseconds(target.getMilliseconds() + duration);

            var delta = target - new Date();

            var stop = false;

            console.log(delta);

            var animation = new Konva.Animation(function (frame) {
                var t = 1 - (target - new Date()) / delta;
                console.log(t);

                if (t > 1) {
                    stop = true;
                    t = 1;
                }

                var periodicity = 5;

                shadows.forEach(function (shadow) {
                    switch (f) {
                        case 'angle':
                            var angle = 30;
                            var target_angle = Math.sin(t * Math.PI * 2 * periodicity) * angle;
                            console.log(angle);
                            console.log(target_angle);
                            shadow.attrs.rotation = (target_angle);
                            break;
                        case 'position':
                            var displacement = 5;
                            var initial_x = shadow.attrs.initial_position.x;
                            shadow.setX(initial_x + Math.sin(t * Math.PI * 2 * periodicity) * displacement);
                            break;
                        default:
                            break;
                    }
                });

                if (stop) {
                    animation.stop();
                }

            }, layer);

            animation.start();

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
            if (is_right_answer(shadow, group)) {
                shadow.attrs.answered=true;
                shadow.attrs.right= true;
            }
            else {
                shadow.attrs.answered=true;
            }

        }
    });

    var group_params = {
        duration: 0.5,
        easing: Konva.Easings.BounceEaseOut,
        x: 0,
        y: 0,
        onFinish: function () {

            //update_answers(stage);
        }
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

    // update_answers(this);
});


stage.on('mouseenter', function (evt) {
    var processes = evt.target;
    if (processes.parent.attrs.name === 'process')
        stage.container().style.cursor = 'pointer';
});

stage.on('mouseleave', function (evt) {
    var processes = evt.target;
    if (processes.parent.attrs.name === 'process')
        stage.container().style.cursor = 'default';
});
