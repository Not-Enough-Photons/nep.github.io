class Project {
    name = "";
    video = "";
    release = "";
}

var request = new Request("https://raw.githubusercontent.com/Not-Enough-Photons/nep.github.io/main/project_information.json");

const projects = [];

const TYPE_MOD = 0;
const TYPE_GAME = 1;
const TYPE_OTHER = 2;

var pageType = 0;

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

    let selected;

    for (let i = 0; i < projects.length; i++)
    {
        if (event.target.textContent == projects[i].name)
        {
            selected = projects[i];
            break;
        }
    }

    currentVideo = selected.video;

    if (activeVideo == currentVideo) {
        return;
    }

    background.src = currentVideo;
    background.load();

    activeVideo = currentVideo;
}

function getPageType() {
    pageType = 0;

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

function renderPage() {
    const length = projects.length;
    const target = document.querySelector("#project-parent>ln");

    target.innerHTML = "";

    let redirect = "";

    for (let i = 0; i < length; i++)
    {
        let project = projects[i];

        var content = `<a href="${pageType}/${redirect}.html">
            <p class="project-title" id="project-button">
                <span id="project-name">${project.name}</span>
                <span class="release-footnote">${project.release}</span>
                </p>
            </a>`

        target.innerHTML += content;
    }

    const elements = document.querySelectorAll('#project-parent p#project-button span#project-name');

    elements.forEach((element) => {
        element.addEventListener('mouseover', onHover);
    });
}

function initializeProjectData(json) {
    const length = Object.keys(json).length;

    for (let i = 0; i < length; i++)
    {
        let currentKey = json[i];
        let currentKeyName = Object.keys(currentKey)[0];
        let currentProject = currentKey[currentKeyName];
        
        let data = new Project();

        data.name = currentProject["projectName"];
        data.video = currentProject["projectVideo"];
        data.release = currentProject["projectRelease"];

        projects.push(data);
    }
}

function onDataLoaded(json) {
    let target = "";

    if (getPageType() == TYPE_MOD)
        target = "mods";
    else if (getPageType() == TYPE_GAME)
        target = "games";
    else if (getPageType() == TYPE_OTHER)
        target = "projects";
    
    initializeProjectData(json[target]);
    renderPage();
}

const scrollbar = document.querySelector("div.project-listings");
scrollbar.scrollIntoView();

var currentVideo = "";
var activeVideo = "";