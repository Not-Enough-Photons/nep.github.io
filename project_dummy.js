class ProjectInfo {
    projectBanner = "";
    projectName = "";
    projectRelease = "";
    projectGame = "";
    projectPlatform = "";
}

const json = fetch("https://notenoughphotons.dev/project_information.json")
.then((request) => { return request.json();})
.then((data) => console.log(data));

var baseInfo = new ProjectInfo();

function LoadInfo(name) {
    baseInfo.projectName = name;

    if(name == "MonoDirector") {
        baseInfo.projectPlatform = "Valve Index";
        baseInfo.projectGame = "BONELAB";
        baseInfo.projectRelease = "2023 TBD";
    }
    else if(name == "Paranoia") { 
        baseInfo.projectPlatform = "Valve Index";
        baseInfo.projectGame = "BONELAB";
        baseInfo.projectRelease = "2022";
    }
}

const nameElement = document.querySelector("p#name");
const releaseElement = document.querySelector("p#release");
const gameElement = document.querySelector("p#game");
const platformElement = document.querySelector("p#platform");

LoadInfo("Paranoia");

nameElement.textContent = baseInfo.projectName;
releaseElement.textContent = baseInfo.projectRelease;
gameElement.textContent = baseInfo.projectGame;
platformElement.textContent = baseInfo.projectPlatform;