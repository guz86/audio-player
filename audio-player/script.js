fetch('./audioData.json')
    .then(response => response.json())
    .then(data => {
        let currentTrackIndex = 0;
        const audio = new Audio(data[currentTrackIndex].audio);
        audio.volume = .75;
        const playPauseIcon = document.getElementById("play-pause-icon");
        const coverImage = document.getElementById("cover-image");
        const content = document.querySelector('.content');

        coverImage.src = data[currentTrackIndex].cover;
        document.getElementById("track-title").textContent = data[currentTrackIndex].title;
        content.style.setProperty('--bg-image', `url('${data[currentTrackIndex].cover}')`);



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

        audio.addEventListener('ended', () => {
            currentTrackIndex = (currentTrackIndex + 1) % data.length;
            playTrack(currentTrackIndex);
        });

        function playTrack(index) {
            audio.src = data[index].audio;
            coverImage.src = data[index].cover;
            document.getElementById("track-title").textContent = data[index].title;
            audio.play();
            playPauseIcon.classList.remove("toggle-play");
            playPauseIcon.classList.add("toggle-pause");
            content.style.setProperty('--bg-image', `url('${data[index].cover}')`);
        }

        document.getElementById("prev-track").addEventListener("click", () => {
            currentTrackIndex = (currentTrackIndex - 1 + data.length) % data.length;
            playTrack(currentTrackIndex);
        });

        document.getElementById("next-track").addEventListener("click", () => {
            currentTrackIndex = (currentTrackIndex + 1) % data.length;
            playTrack(currentTrackIndex);
        });
    });
