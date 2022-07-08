const loadingAnimation = {
    div: document.querySelector('.loading-image'),
    processId: undefined,
    rotation: 0,
    runAnimation() {
        this.processId = setInterval(this.animation.bind(this), 70);
        this.rotation = 0;
    },
    stopAnimation() {
        clearInterval(this.processId);
    },
    
    animation() {
        this.rotation = this.rotation + 45;
        if (this.rotation === 360) {
            this.rotation = 0;
        }
        this.div.style.transform = `rotate(${this.rotation}deg)`;
    }
}
