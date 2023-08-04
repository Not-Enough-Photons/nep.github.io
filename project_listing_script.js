const elements = document.querySelectorAll('#project-parent p#project-button span#project-name');

const projectVideos = {
    "Hitmarkers": "webm/project_hitmarkers.webm",
    "Scoreworks": "webm/project_scoreworks.webm",
    "Paranoia": "webm/project_paranoia.webm",
    "MonoDirector": "webm/project_monodirector.webm",
    "Thrusters": "webm/project_thrusters.webm",
    "Smiler": "webm/game_smiler.webm",
    "Light Night": "webm/game_lightnight.webm",
    "Hide And Seek": "webm/game_hideandseek.webm"
};

const scrollbar = document.querySelector("div.project-listings");
scrollbar.scrollIntoView();

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