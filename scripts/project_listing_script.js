
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

    if (window.location.href.indexOf("mods") > -1) {
        pageType = 0;
    }
    else if (window.location.href.indexOf("games") > -1) {
        pageType = 1;
    }
    else if (window.location.href.indexOf("projects") > -1) {
        pageType = 2;
    }

    return pageType;
}

function renderPage(obj) {
    const target = document.querySelector("#project-parent>ln");
    target.innerHTML = "";

    for (let i = 0; i < Object.keys(obj).length; i++) {
        let curElement = obj[i];

        let redirect = curElement["projectRedirect"];
        let name = curElement["projectName"];
        let release = curElement["projectRelease"];
        let base = curElement["projectGame"];
        let releaseWindow = `${base} - (${release})`

        console.log(redirect);

        if (name == null)
        {
            continue;
        }

        if (base == null)
        {
            releaseWindow = release != null ? `${release}` : "";
        }

        var content = `<a href="mods/${redirect}.html">
            <p class="project-title" id="project-button">
                <span id="project-name">${name}</span>
                <span class="release-footnote">${releaseWindow}</span>
                </p>
            </a>`
        target.innerHTML += content;

        const elements = document.querySelectorAll('#project-parent p#project-button span#project-name');

        elements.forEach((element) => {
            element.addEventListener('mouseover', onHover);
        });
    }
}

function onDataLoaded(json) {
    const projectElements = document.querySelectorAll('#project-parent > ln > a');

    if (getPageType() == 0) {
        renderPage(json["mods"]);
    }
    else if (getPageType() == 1) {
        renderPage(json["games"]);
    }
    else if (getPageType() == 2) {
        renderPage(json["projects"]);
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