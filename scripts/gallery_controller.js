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
var galleryElements = document.querySelectorAll(".gallery-image");

var previousImageButton = document.querySelector(".backButton");
var nextImageButton = document.querySelector(".nextButton");

var imageElements = [];
var localIndex = 0;

galleryController_init();

function galleryController_init() {
    galleryElements.forEach((element) => {
        var image = element.querySelector('img');

        if(image != null)
        {
            var imageElement = new ImageElement(image.src, localIndex++, image);
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