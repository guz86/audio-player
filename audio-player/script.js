fetch('./audioData.json')
    .then(response => response.json())
    .then(data => {
        let currentTrackIndex = 0;
        const audio = new Audio(data[currentTrackIndex].audio);
        audio.volume = 0.75;
        const playPauseIcon = document.getElementById("play-pause-icon");
        const coverImage = document.getElementById("cover-image");
        const content = document.querySelector('.content');

        coverImage.src = data[currentTrackIndex].cover;
        document.getElementById("track-title").textContent = data[currentTrackIndex].title;
        document.getElementById("track-author").textContent = data[currentTrackIndex].author;
        content.style.setProperty('--bg-image', `url('${data[currentTrackIndex].cover}')`);

        const currentTimeDisplay = document.getElementById("current-time");
        const trackDurationDisplay = document.getElementById("track-duration");

        function formatDuration(seconds) {
            const minutes = Math.floor(seconds / 60);
            const secs = Math.floor(seconds % 60);
            return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
        }

        const progressBar = document.getElementById("progress-bar");
        const line = document.getElementById("line");
        let isDragging = false;

        audio.addEventListener('loadedmetadata', () => {
            trackDurationDisplay.textContent = formatDuration(audio.duration);
            progressBar.style.width = '0%';
        });

        audio.addEventListener('timeupdate', () => {
            currentTimeDisplay.textContent = formatDuration(audio.currentTime);
            const progressPercent = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progressPercent}%`;
        });

        line.addEventListener('mousedown', (e) => {
            isDragging = true;
            updateProgress(e);
        });

        line.addEventListener('mousemove', (e) => {
            if (isDragging) {
                updateProgress(e);
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        function updateProgress(e) {
            const rect = line.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const width = rect.width;
            const progress = Math.min(Math.max(offsetX / width, 0), 1);
            progressBar.style.width = `${progress * 100}%`;
            audio.currentTime = progress * audio.duration;
        }

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
            document.getElementById("track-author").textContent = data[index].author;
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
