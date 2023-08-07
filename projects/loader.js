function loadScript(url) {
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    head.appendChild(script);
}

loadScript("required.js");
loadScript("gallery_view.js");
loadScript("gallery_controller.js");