let currentPlayingItem = null;
let currentOriginalHTML = null;
const globalPlayer = new Audio();


function searchMusic() {
    const input = document.getElementById('search').value.toLowerCase();
    const items = document.getElementsByClassName('music-item');

    Array.from(items).forEach(item => {
        const songName = item.querySelector('.song-name').innerText.toLowerCase();
        item.style.display = songName.includes(input) ? 'flex' : 'none';
    });
}

function playMusic(song, element, id) {

    event.stopPropagation();


    if (currentPlayingItem === element) {
        togglePlayPause();
        return;
    }


    if (currentPlayingItem) {
        currentPlayingItem.innerHTML = currentOriginalHTML;
        currentPlayingItem.classList.remove('playing');
    }


    currentOriginalHTML = element.innerHTML;
    currentPlayingItem = element;


    const songName = element.querySelector('.song-name').innerText;
    element.innerHTML = `
                <div class="inline-player" onclick="event.stopPropagation()">
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%">
                        <div style="font-weight: bold">${songName}</div>
                        <div class="player-controls">
                            <button class="icon-btn" onclick="skip(-10)">
                                <i class="fas fa-backward"></i>
                            </button>
                            <button class="icon-btn" id="play-pause-btn">
                                <i id="play-pause-icon" class="fas fa-pause"></i>
                            </button>
                            <button class="icon-btn" onclick="skip(10)">
                                <i class="fas fa-forward"></i>
                            </button>
                        </div>
                    </div>
                    <audio id="global-player" style="width: 100%; margin-top: 10px;"></audio>
                </div>
            `;


    const audioElement = element.querySelector('audio');
    audioElement.src = song;
    audioElement.play();


    const playPauseBtn = element.querySelector('#play-pause-btn');
    playPauseBtn.addEventListener('click', togglePlayPause);

    audioElement.addEventListener('play', () => {
        element.classList.add('playing');
        element.querySelector('#play-pause-icon').classList.replace('fa-play', 'fa-pause');
    });

    audioElement.addEventListener('pause', () => {
        element.classList.remove('playing');
        element.querySelector('#play-pause-icon').classList.replace('fa-pause', 'fa-play');
    });

    audioElement.addEventListener('ended', () => {
        element.innerHTML = currentOriginalHTML;
        element.classList.remove('playing');
        currentPlayingItem = null;
    });
}

function togglePlayPause() {
    const audioElement = currentPlayingItem.querySelector('audio');
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
    }
}

function skip(seconds) {
    const audioElement = currentPlayingItem.querySelector('audio');
    audioElement.currentTime += seconds;
}
function addToFavorites(event, songName, songFile) {
    event.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(song => song.file === songFile)) {
        favorites.push({ name: songName, file: songFile });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        alert(`${songName} added to favorites!`);
    } else {
        alert(`${songName} is already in favorites.`);
    }
}

function addToPlaylist(event, songName, songFile) {
    event.stopPropagation();
    let playlist = JSON.parse(localStorage.getItem('playlist')) || [];
    if (!playlist.some(song => song.file === songFile)) {
        playlist.push({ name: songName, file: songFile });
        localStorage.setItem('playlist', JSON.stringify(playlist));
        alert(`${songName} added to playlist!`);
    } else {
        alert(`${songName} is already in playlist.`);
    }
}


globalPlayer.addEventListener('ended', () => {
    if (currentPlayingItem) {
        currentPlayingItem.classList.remove('playing');
        currentPlayingItem = null;
        currentPlayingId = null;
    }
    if (playPauseIcon) playPauseIcon.classList.replace('fa-pause', 'fa-play');
});