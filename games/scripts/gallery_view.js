var galleryView = document.querySelector(".gallery-image-view");
var galleryViewFooter = document.querySelector(".gallery-view-footer");

var previousImageButton = document.querySelector(".backButton");
var nextImageButton = document.querySelector(".nextButton");
var closeButton = document.querySelector(".button-close");
var pageIndex = document.querySelector(".pageIndex");
var imageView = document.querySelector(".gallery-image");

let currentIndex = 1;
let maxIndex = 0;

previousImageButton.addEventListener("click", function() {
    previousIndex();
});

nextImageButton.addEventListener("click", function() {
    nextIndex();
});

closeButton.addEventListener("click", function() {
    galleryView.style.display = "none";
    galleryView.style.zIndex = -1;
});

function onIndexChanged() {
    pageIndex.textContent = `${currentIndex + 1}/${maxIndex}`
    imageView.src = projectInfo.gallery[currentIndex];
}

function setIndex(index) {
    currentIndex = index;
    onIndexChanged();
}

function setMaxElements(max) {
    maxIndex = max;
}

function nextIndex() {
    if (currentIndex + 1 >= maxIndex) {
        currentIndex = maxIndex;
        return;
    }
    else {
        currentIndex++;
    }

    onIndexChanged();
}

function previousIndex() {
    if (currentIndex + 1 <= 1) {
        currentIndex = 1;
        return;
    }
    else {
        currentIndex--;
    }

    onIndexChanged();
}