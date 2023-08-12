class ProjectInfo {
    projectPageName = "";
    projectBanner = "";
    projectName = "";
    projectRelease = "";
    projectGame = "";
    projectPlatform = "";
    gallery = [];
    description = "";
}

const fs = require('fs');
const { json } = require('stream/consumers');

let jsonData = null;

fs.readFile('./project_information.json', (err, data) => {
    if (err) {
        throw err;
    }
    else {
        jsonData = JSON.parse(data.toString());
        writeProjectPage(jsonData)
    }
});

function writeProjectPage(jsonData) {
    const keys = Object.keys(jsonData);
    for (var key in keys) {
        console.log(key);
        let projectInfo = new ProjectInfo();
        projectInfo = jsonData[keys[key]];

        const htmlString = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${projectInfo.projectName} | Not Enough Photons</title>
            <link rel="stylesheet" href="styles/styles_project_dummy.css">
            <link rel="stylesheet" href="styles/styles_gallery.css">
            <script src="/scripts/project_page_init.js" defer></script>
        </head>
        </html>`;

        const htmlData = new Uint8Array(Buffer.from(htmlString));
        let gamePath = './games/';
        let modPath = './mods/';

        let finalPath = projectInfo.projectPageName.startsWith("mod_") ? modPath += projectInfo.projectPageName : gamePath += projectInfo.projectPageName;
        finalPath += ".html"

        fs.writeFileSync(finalPath, htmlData, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}