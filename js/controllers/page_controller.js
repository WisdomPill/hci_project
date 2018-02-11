function showGame() {
    document.getElementById("container").hidden = false;
    document.getElementById("help").style.display = 'none';
    document.getElementById("reset-button").hidden = false;
}



function showHelp() {
    document.getElementById("container").hidden = true;
    document.getElementById("help").style.display = 'block';
    document.getElementById("reset-button").hidden = true;
}

function PlaySound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.play();
}

function StopSound(soundobj) {
    var thissound=document.getElementById(soundobj);
    thissound.pause();
    thissound.currentTime = 0;
}

function compile(){
    compile_level(stage);
}

function resetButton() {
    reposition_processes(stage);
    hide_pseudo_codes(stage);
}

