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

            compile_level(this);

            break;
        case 'popup_button':

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
            shadowOffsetY: 15
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
        }
    });

    var group_params = {
        duration: 0.5,
        easing: Konva.Easings.BounceEaseOut,
        x: 0,
        y: 0,
        onFinish: function () {
            update_answers(stage);
        }
    };

    if (near_shadow == null) {
        group_params.x = group.attrs.initial.x;
        group_params.y = group.attrs.initial.y;
    } else {
        group_params.x = near_shadow.attrs.x;
        group_params.y = near_shadow.attrs.y;
        group_params.onFinish = function () {
            update_answers(stage);
            PlaySound('beep');
        }
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
