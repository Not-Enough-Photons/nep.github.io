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

const projectLinks = {
    "Hitmarkers": "projects/project_hitmarkers.html",
    "Scoreworks": "projects/project_scoreworks.html",
    "Paranoia": "projects/project_paranoia.html",
    "MonoDirector": "projects/project_monodirector.html",
    "Thrusters": "projects/project_thrusters.html",
    "Smiler": "projects/project_smiler.html",
    "Light Night": "projects/project_lightnight.html",
    "Hide And Seek": "projects/project_hideandseek.html"
}

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

function onClick(event) {
    var title = event.target.textContent;
    window.location = projectLinks[title];
}

elements.forEach((element) => {
    element.addEventListener('mouseover', onHover);
    element.addEventListener('click', onClick)
});