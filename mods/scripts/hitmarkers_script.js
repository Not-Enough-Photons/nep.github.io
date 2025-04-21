const body = document.body;

class Marker {
    constructor(x, y) {
        this.setPosition(x, y);

        const markerDim = 512;

        var marker = document.createElement('img');
        marker.className = 'gen-marker';
        marker.src = './img/hitmarkers/marker.png';
        marker.style.transform = `translate(${this.posX - markerDim}px, ${this.posY - markerDim}px)`;

        this.markerElement = marker;

        body.appendChild(marker);

        // Remove marker after animation is complete
        marker.onanimationend = () => {
            body.removeChild(this.markerElement);
        };
    }

    posX = 0;
    posY = 0;
    markerElement = null;

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;
    }
}

body.onclick = ((event) => {
    let marker = new Marker(event.pageX, event.pageY);
});