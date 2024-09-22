const audio = new Audio(
    "./assets/music/1.mp3"
);

// console.dir(audio);

const playPauseIcon = document.getElementById("play-pause-icon");

playPauseIcon.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        playPauseIcon.classList.remove("toggle-play");
        playPauseIcon.classList.add("toggle-pause");
    } else {
        audio.pause();
        playPauseIcon.classList.remove("toggle-pause");
        playPauseIcon.classList.add("toggle-play");
    }
});

