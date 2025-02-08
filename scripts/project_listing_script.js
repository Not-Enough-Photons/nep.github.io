
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

function onHover(event) {
    const background = document.getElementById("video-background");

    currentVideo = projectVideos[event.target.textContent];

    if (activeVideo == currentVideo) {
        return;
    }

    background.src = currentVideo;
    background.load();

    activeVideo = currentVideo;
}

function getPageType() {
    var pageType = 0;

    if (window.location.href.indexOf("mods") > -1)
    {
        pageType = 0;
    }
    else if (window.location.href.indexOf("games") > -1)
    {
        pageType = 1;
    }
    else if (window.location.href.indexOf("projects"))
    {
        pageType = 2;
    }

    return pageType;
}

function onDataLoaded(json) {
    const projectElements = document.querySelectorAll('#project-parent > ln > a');

    const target = document.querySelector("#project-parent>ln");
    target.innerHTML = "";

    for (const key in json) {
        console.log(key)

        if (key.startsWith("game_")) {
            let gameRoot = json[key];
            let gameName = gameRoot["projectName"];
            let gameRelease = gameRoot["projectRelease"];
            var content = `<a href="games/${key}.html">
                <p class="project-title" id="project-button">
                    <span id="project-name">${gameName}</span>
                    <span class="release-footnote">${gameRelease}</span>
                    </p>
                </a>`
            target.innerHTML += content;
        }
        else if (key.startsWith("mod_")) {
            let modRoot = json[key];
            let modName = modRoot["projectName"];
            let modRelease = modRoot["projectRelease"];
            let modBase = modRoot["projectGame"];
            var content = `<a href="mods/${key}.html">
                <p class="project-title" id="project-button">
                    <span id="project-name">${modName}</span>
                    <span class="release-footnote">${modBase} - (${modRelease})</span>
                    </p>
                </a>`
            target.innerHTML += content;
        }
        else if (key.startsWith("project_"))
        {
            let projectRoot = json[key];
            let projectName = projectRoot["projectName"];
            let projectRelesae = projectRoot["projectRelease"];
            let projectBase = projectRoot["projectGame"];
            var content = `<a href="mods/${key}.html">
                <p class="project-title" id="project-button">
                    <span id="project-name">${projectBase}</span>
                    <span class="release-footnote">${projectBase} - (${projectRelesae})</span>
                    </p>
                </a>`
            target.innerHTML += content;
        }

        const elements = document.querySelectorAll('#project-parent p#project-button span#project-name');

        elements.forEach((element) => {
            element.addEventListener('mouseover', onHover);
        });
    }
}


const projectVideos = {
    "MagPerception": "./webm/project_magperception.webm",
    "Hitmarkers": "./webm/project_hitmarkers.webm",
    "DOOMLAB": "./webm/project_doomlab.webm",
    "Scoreworks": "./webm/project_scoreworks.webm",
    "Paranoia": "./webm/project_paranoia.webm",
    "MonoDirector": "./webm/project_monodirector.webm",
    "Thrusters": "./webm/project_thrusters.webm",
    "Doors Of Gore": "./webm/game_doorsofgore.webm",
    "Smiler": "./webm/game_smiler.webm",
    "Light Night": "./webm/game_lightnight.webm",
    "Hide And Seek": "./webm/game_hideandseek.webm"
};

const scrollbar = document.querySelector("div.project-listings");
scrollbar.scrollIntoView();

var currentVideo = "";
var activeVideo = "";