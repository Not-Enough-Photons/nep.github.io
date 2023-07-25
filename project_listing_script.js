const elements = document.querySelectorAll('#project-parent p#project-button');

function onHover(event) {
    const background = document.getElementById("video-background");

    if(event.target.textContent == "Hitmarkers") {
        background.src = "img/project_hitmarkers.mp4";
    }
    else if(event.target.textContent == "Scoreworks") {
        background.src = "img/project_scoreworks.mp4";
    }
    else if(event.target.textContent == "Paranoia") {
        background.src = "img/project_paranoia.mp4";
    }
    else if(event.target.textContent == "MonoDirector") {
        background.src = "img/project_monodirector.mp4";
    }
    else if(event.target.textContent == "Thrusters") {
        background.src = "img/project_thrusters.mp4";
    }
    
    background.load();
}

elements.forEach((element) => {
    element.addEventListener('mouseover', onHover);
});