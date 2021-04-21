class Sound {
    constructor(src){
        this.sound = document.createElement("audio");
        this.sound.src = src;
        this.sound.setAttribute("preload", "auto");
        this.sound.setAttribute("controls", "none");
        this.sound.style.display = "none";
        document.body.appendChild(this.sound);
    }
    play(){
        if(sounds) {
            this.sound.currentTime = 0;
            this.sound.play();
        }

    }
    stop(){
        this.sound.pause();
    }
}

function setSounds(e) {
    sounds = e;
    if(layout === 1 && e === true){
        soundtrack.play();
    } else {
        soundtrack.stop();
        gameOver.stop();
        gameWin.stop();
    }
}

let sounds = true;