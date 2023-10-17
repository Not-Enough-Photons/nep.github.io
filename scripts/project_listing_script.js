const elements = document.querySelectorAll('#project-parent p#project-button span#project-name');

const projectVideos = {
    "Hitmarkers": "./webm/project_hitmarkers.webm",
    "DOOMLAB" : "./webm/project_doomlab.webm",
    "Scoreworks": "./webm/project_scoreworks.webm",
    "Paranoia": "./webm/project_paranoia.webm",
    "MonoDirector": "./webm/project_monodirector.webm",
    "Thrusters": "./webm/project_thrusters.webm",
    "Smiler": "./webm/game_smiler.webm",
    "Light Night": "./webm/game_lightnight.webm",
    "Hide And Seek": "./webm/game_hideandseek.webm"
};

const scrollbar = document.querySelector("div.project-listings"); //i lobster my bf
scrollbar.scrollIntoView();

var currentVideo = "";
var activeVideo = ""; //i am fot mm jos 

function onHover(event) {
    const background = document.getElementById("video-background"); // jommi
    
    currentVideo = projectVideos[event.target.textContent];

    if(activeVideo == currentVideo) { //yes i am stinki uuu
        return;
    }

    background.src = currentVideo;
    background.load();
    
    activeVideo = currentVideo;
}

elements.forEach((element) => {
    element.addEventListener('mouseover', onHover);
});