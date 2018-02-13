function showGame() {
    document.getElementById("container").hidden = false;
    document.getElementById("help").style.display = 'none';
    document.getElementById("reset-button").hidden = false;
    document.getElementById("titleLevel1").hidden = false;
}

function showHelp() {
    document.getElementById("container").hidden = true;
    document.getElementById("help").style.display = 'block';
    document.getElementById("reset-button").hidden = true;
    document.getElementById("titleLevel1").hidden = true;
}

function showMessageWon() {
    document.getElementById("messagewon").style.display = 'block';
}

function showMessageMissing() {
    document.getElementById("messagemissing").style.display = 'block';
}

// $(document).onload(function () {
//     $('.hoverable').on('onmouseover', function () {
//         PlaySound('audio/beep.wav');
//     });
// });

function PlaySound(name) {
    var sound = new Audio('audio/'+ name+ '.wav');
    sound.play();
}

function StopSound(name) {

    var sound = new Audio('audio/'+ name + '.wav');
    sound.pause();
    sound.currentTime = 0;
}

function compile() {
    compile_level(stage);
}

function resetButton() {
    reposition_processes(stage);
    hide_pseudo_codes(stage);
}

