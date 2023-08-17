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
var galleryElements = document.querySelectorAll(".gallery-image-container");

var previousImageButton = document.querySelector(".backButton");
var nextImageButton = document.querySelector(".nextButton");

var imageElements = [];
var localIndex = 0;

galleryController_init();

function galleryController_init() {
    galleryElements.forEach((element) => {
        var imgType = element.querySelector("img");
        var iframeType = element.querySelector("iframe");

        if(imgType != null) {
            var imageElement = new ImageElement(imgType.src, localIndex++, imgType);
            imageElements.push(imageElement);
        }
        else if(iframeType != null) {
            var imageElement = new ImageElement(iframeType, localIndex++, iframeType);
            imageElements.push(imageElement);
        }
        
    });
    
    imageElements.forEach((imageElement) => imageElement.node.addEventListener("click", function(event) {
        onClickElement(imageElement);
    }));
}

function onClickElement(element) {
    galleryView.style.display = "block";
    galleryView.style.zIndex = 1;

    setMaxElements(imageElements.length);
    setIndex(element.index);
}