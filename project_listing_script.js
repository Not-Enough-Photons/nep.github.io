const elements = document.querySelectorAll('#project-parent p#project-button');
const projectVideos = {
    "Hitmarkers": "img/project_hitmarkers.webm",
    "Scoreworks": "img/project_scoreworks.webm",
    "Paranoia": "img/project_paranoia.webm",
    "MonoDirector": "img/project_monodirector.webm",
    "Thrusters": "img/project_thrusters.webm",
    "Smiler": "img/game_smiler.webm",
    "Light Night": "img/game_lightnight.webm",
    "Hide And Seek": "img/game_hideandseek.webm"
};

var currentVideo = "";
var activeVideo = "";

function onHover(event) {
    const background = document.getElementById("video-background");
    
    currentVideo = projectVideos[event.target.textContent];

    if(activeVideo == currentVideo) {
        return;
    }

    background.src = currentVideo;
    background.load();
    
    activeVideo = currentVideo;
}

elements.forEach((element) => {
    element.addEventListener('mouseover', onHover);
});