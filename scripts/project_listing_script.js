class Project {
    name = "";
    video = "";
    release = "";
    redirect = "";
    setup = false;

    setName(name) {
        this.name = name;
    }

    setVideo(video) {
        this.video = video;
    }

    setRelease(release) {
        if (release != null)
        {
            this.release = release;
        }
        else
        {
            this.release = "TBD";
        }
    }

    setRedirect(redirect) {
        if (redirect != null || redirect != undefined) 
        {
            this.redirect = redirect;
            this.setup = true;
        }
        else
        {
            this.redirect = "404";
            this.setup = false;
        }
    }
}

var request = new Request("https://raw.githubusercontent.com/NotEnoughPhotons/notenoughphotons.dev/main/project_information.json");

const projects = [];

const TYPE_MOD = 0;
const TYPE_GAME = 1;
const TYPE_OTHER = 2;

var pageType = "";

const scroll = document.getElementById("project-parent");

updateScrollGradient();

scroll.addEventListener('scroll', (event) => {
    updateScrollGradient();
})

function updateScrollGradient() {
    let top = scroll.scrollTop;
    let pos = scroll.scrollHeight - scroll.clientHeight;
    let value = top / pos;

    const alphaMult = 10.0;
    let blackFactor = value * alphaMult;

    let y1_top = `rgba(0, 0, 0, ${1 - blackFactor})`;
    let y2_bottom = `rgba(0, 0, 0, ${blackFactor - 9.25})`

    scroll.style.maskImage = `linear-gradient(${y1_top}, white, ${y2_bottom})`
}

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
    let pageType = 0;

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
    const target = document.querySelector("#project-parent");

    // Ensure that all children are cleared out
    target.innerHTML = "";

    for (let i = 0; i < length; i++)
    {
        let project = projects[i];

        const linkElement = document.createElement('a');
        linkElement.href = project.notSetup ? `${pageType}/${project.redirect}.html` : `${project.redirect}.html`;

        const projectTitle = document.createElement('p');
        projectTitle.className = 'project-title';
        projectTitle.id = 'project-button';

        const projectNameSpan = document.createElement('span');
        projectNameSpan.id = 'project-name';
        projectNameSpan.innerHTML = project.name;

        const projectReleaseSpan = document.createElement('span');
        projectReleaseSpan.className = 'release-footnote';
        projectReleaseSpan.innerHTML = project.release;

        linkElement.appendChild(projectTitle);
        projectTitle.appendChild(projectNameSpan);
        projectTitle.appendChild(projectReleaseSpan);

        target.appendChild(linkElement);
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

        data.setName(currentProject["projectName"]);
        data.setVideo(currentProject["projectVideo"]);
        data.setRelease(currentProject["projectRelease"]);
        data.setRedirect(currentProject["projectRedirect"]);

        projects.push(data);
    }
}

function onDataLoaded(json) {
    if (getPageType() == TYPE_MOD)
        pageType = "mods";
    else if (getPageType() == TYPE_GAME)
        pageType = "games";
    else if (getPageType() == TYPE_OTHER)
        pageType = "projects";
    
    initializeProjectData(json[pageType]);
    renderPage();
}

const scrollbar = document.querySelector("div.project-listings");
scrollbar.scrollIntoView();

var currentVideo = "";
var activeVideo = "";