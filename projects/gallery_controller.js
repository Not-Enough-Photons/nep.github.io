class ImageElement {
    constructor(url, index, node) {
        this.url = url;
        this.index = index;
        this.node = node;
    }

    url = "";
    index = 0;
    node = null;
}

var galleryView = document.querySelector(".gallery-image-view");
var galleryGrid = document.querySelector(".gallery-view-container")

var previousImageButton = document.querySelector(".backButton");
var nextImageButton = document.querySelector(".nextButton");

var elements = [];
var localIndex = 0;

images.forEach((image) => { appendImage(image); });

elements.forEach((element) => element.node.addEventListener("click", function(event) {
    onClickElement(element);
}));

function appendImage(image) {
    var divNode = document.createElement("div");
    var imgNode = document.createElement("img");

    console.log(image + ": " + localIndex);

    imageElement = new ImageElement(image, localIndex++, divNode);

    divNode.className = "gallery-image";
    imgNode.src = image;

    galleryGrid.appendChild(divNode);
    divNode.appendChild(imgNode);

    elements.push(imageElement);
}

function onClickElement(element) {
    galleryView.style.display = "block";
    galleryView.style.zIndex = 1;

    setMaxElements(images.length);
    setIndex(element.index);
}