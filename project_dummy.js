class ProjectInfo {
    projectBanner = "";
    projectName = "";
    projectRelease = "";
    projectGame = "";
    projectPlatform = "";
    description = "";
}

var projectName = "";
var jsonData = null;

const jsonRequest = fetch("https://notenoughphotons.dev/project_information.json")
.then((request) => request.json());

jsonRequest.then((data) => onInfoRead(data));

function setProject(projectName) {
    this.projectName = projectName;
}

function onInfoRead(data) {
    setProject("Paranoia");

    const stringData = JSON.stringify(data);
    const obj = JSON.parse(stringData);
    var baseInfo = obj[projectName];

    const nameElement = document.querySelector("p#name");
    const releaseElement = document.querySelector("p#release");
    const gameElement = document.querySelector("p#game");
    const platformElement = document.querySelector("p#platform");
    const description = document.querySelector("p#description");

    nameElement.textContent = baseInfo.projectName;
    releaseElement.textContent = "Release Date: " + baseInfo.projectRelease;
    gameElement.textContent = "Game: " + baseInfo.projectGame;
    platformElement.textContent = "Platform: " + baseInfo.projectPlatform;
    description.textContent = baseInfo.description;
}