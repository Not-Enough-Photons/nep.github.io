class ProjectInfo {
    projectBanner = "";
    projectName = "";
    projectRelease = "";
    projectGame = "";
    projectPlatform = "";
}

fetch("./project_information.json")
.then(function(response) {
    return response.json();
})
.then(function(data) {
    console.log(data);
});

const nameElement = document.querySelector("name");
const releaseElement = document.querySelector("release");
const gameElement = document.querySelector("game");
const platformElement = document.querySelector("platform");

nameElement.textContent = info.projectName;
releaseElement.textContent = info.projectRelease;
gameElement.textContent = info.projectGame;
platformElement.textContent = info.projectPlatform;