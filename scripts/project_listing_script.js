const elements = document.querySelectorAll('#project-parent p#project-button span#project-name');

var request = new Request("https://raw.githubusercontent.com/Not-Enough-Photons/nep.github.io/main/project_information.json");

fetch(request)
    .then((request) => {
        if (request.status == 200) {
            request.json().then((obj) => onDataLoaded(obj));
        }
        else {
            throw new Error("Couldn't load JSON from GitHub link!");
        }
    });

function onDataLoaded(json) {
    const projectElements = document.querySelectorAll('#project-parent > ln > a');

    let mods = [];
    let games = [];
    const target = document.querySelector("#project-parent>ln");
    target.innerHTML = "";

    for (const key in json) {
        if (key.startsWith("game_")) {
            let gameRoot = json[key];
            let gameName = gameRoot["projectName"];
            let gameRelease = gameRoot["projectRelease"];
            var content = `<a href="__internalLink__">
                <p class="project-title" id="project-button">
                    <span id="project-name">${gameName}</span>
                    <span class="release-footnote">${gameRelease}</span>
                    </p>
                </a>`
            target.innerHTML += content;
        }
        else if (key.startsWith("mod_")) {
            var text = document.createTextNode(`'<a href="__internalLink__"><p class="project-title" id="project-button"><span id="project-name">__projectName__</span><span class="release-footnote">__releaseDate__ - </span></p></a>"'`);
        }
    }
}


const projectVideos = {
    "MagPerception" : "./webm/project_magperception.webm",
    "Hitmarkers": "./webm/project_hitmarkers.webm",
    "DOOMLAB" : "./webm/project_doomlab.webm",
    "Scoreworks": "./webm/project_scoreworks.webm",
    "Paranoia": "./webm/project_paranoia.webm",
    "MonoDirector": "./webm/project_monodirector.webm",
    "Thrusters": "./webm/project_thrusters.webm",
    "Doors Of Gore": "./webm/game_doorsofgore.webm",
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