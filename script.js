const audio = new Audio();
let isPlaying = false;

const playIcon = document.getElementById('play-icon');
const playPauseBtn = document.getElementById('play-pause-btn');
const currentSongTitle = document.getElementById('current-song-title');
const currentSongArtist = document.getElementById('current-song-artist');
const currentSongImg = document.getElementById('current-song-img');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeBar = document.querySelector('.volume-bar');

const songCards = document.querySelectorAll('.songcard');

// Play song on card click
songCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.title').innerText.trim();
        const artist = card.querySelector('.songdesc').innerText.trim();
        const img = card.querySelector('.songimg').src;

        currentSongTitle.innerText = title;
        currentSongArtist.innerText = artist;
        currentSongImg.src = img;

        audio.src = `songs/${title}.mp3`;
        audio.play();
        isPlaying = true;
        playIcon.src = 'pause.svg';
    });
});

// Play/Pause toggle
playPauseBtn.addEventListener('click', () => {
    if (!audio.src) return;

    if (isPlaying) {
        audio.pause();
        playIcon.src = 'play.svg'; // ✅ fix: show play icon when paused
    } else {
        audio.play();
        playIcon.src = 'pause.svg';
    }
    isPlaying = !isPlaying;
});

// Progress bar update
audio.addEventListener('loadedmetadata', () => {
    progressBar.max = Math.floor(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener('timeupdate', () => {
    progressBar.value = Math.floor(audio.currentTime);
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

// Seeking in audio
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

// ✅ Volume control
volumeBar.addEventListener('input', () => {
    audio.volume = volumeBar.value;
});

// Format time in mm:ss
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}
