class ProjectInfo {
    projectBanner = "";
    projectName = "";
    projectRelease = "";
    projectGame = "";
    projectPlatform = "";
    gallery = [];
    description = "";
}

let projectInfo = null;

var projectName = "";
var jsonData = null;

const infoRoot = document.querySelector("div#project-info");

const json = fetch('/project_information.json').then((info) => info.json());
json.then((data) => onInfoRead(data));

buildDummyPage();

function setProject(projectName) {
    this.projectName = projectName;
}

function onInfoRead(data) {
    var rawPageName = location.href.split("/").slice(-1).toString();
    var pageName = rawPageName.split(".")[0];
    setProject(pageName);

    const stringData = JSON.stringify(data);
    const obj = JSON.parse(stringData);
    projectInfo = obj[projectName];
    
    const backButton = document.querySelector(".back-button");
    const bannerElement = document.querySelector("img#project-banner");
    const nameElement = document.querySelector("p#name");
    const releaseElement = document.querySelector("p#release");
    const gameElement = document.querySelector("p#game");
    const platformElement = document.querySelector("p#platform");
    const description = document.querySelector("p#description");
    const galleryHeader = document.querySelector("h1.gallery-header");
    const galleryGrid = document.querySelector(".gallery-view-container");
    
    bannerElement.src = projectInfo.projectBanner;
    nameElement.textContent = projectInfo.projectName;
    releaseElement.textContent = "Release: " + projectInfo.projectRelease;
    gameElement.textContent = "Game: " + projectInfo.projectGame;
    platformElement.textContent = "Platform(s): " + projectInfo.projectPlatform;
    description.textContent = projectInfo.description;

    nameElement.style.display = projectInfo.projectName != null ? "block" : "none";
    releaseElement.style.display = projectInfo.projectRelease != null ? "block" : "none";
    gameElement.style.display = projectInfo.projectGame != null ? "block" : "none";
    platformElement.style.display = projectInfo.projectPlatform != null ? "block" : "none";
    description.style.display = projectInfo.description != null ? "block" : "none";
    galleryHeader.style.display = projectInfo.gallery != null ? "block" : "none";
    galleryGrid.style.display = projectInfo.gallery != null ? "block" : "none";
}

function buildDummyPage() { 
    var page = `
        <div class="back-button">
            <a class="back-text" href="/mods.html">Back</a>
        </div>
        <div class="page">
           
            <div class="gallery-image-view">
                <div class="button-close"><img src="/img/cross.png"></div>
                <img class="gallery-image" src="">
                <div class="gallery-view-footer">
                    <div class="backButton"><img src="/img/arrow.png"></div>
                    <p class="pageIndex">0/0</p>
                    <div class="nextButton"><img src="/img/arrow.png"></div>
                </div>
            </div>
            
            <div class="project-header">
                <section class="project-banner-container">
                    <img id = "project-banner" src="">
                </section>

                <section class="project-info">
                    <p class="info-item" id="name"></p>
                    <p class="info-item" id="release"></p>
                    <p class="info-item" id="game"></p>
                    <p class="info-item" id="platform"></p>
                </section>
            </div>
                <div class="project-body">
                    <section class="project-description">
                        <h1>Overview</h1>
                        <p class="info-item" id="description"></p>

                        <h1 class="gallery-header">Gallery</h1>
                        <div class="gallery-view-container">
                        </div>

                        <h1 class="gallery-header">Downloads</h1>
                        <div class="download-container">
                            <a href=""><p>Thunderstore</p></a>
                        </div>
                    </section>
                </div>
            </div>
        `

    document.body.innerHTML = page;
}