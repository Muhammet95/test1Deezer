let playlist;
let currentPlay = 0, playerStatus = 'pause';
let audio;
let hls;

document.addEventListener("DOMContentLoaded", () => {
    getPlayList();

    audio = new Audio();
    audio.addEventListener('ended', nextMusic);
    hls = new Hls();


    audio.addEventListener("error", (e) => {
        console.log("An error occurred:", e);
    });



    document.querySelector('img#play').addEventListener('click', playPause);

    document.querySelector('img#prev').addEventListener('click', prevMusic);

    document.querySelector('img#next').addEventListener('click', nextMusic);

    // Time/song update
    audio.addEventListener('timeupdate', updateProgress);

});

function playPause() {
    if (!audio.src) {
        if (playlist) {
            setAudio(playlist[currentPlay]);
        }
        setTimeout(playPause, 100);
    } else {
        if (playerStatus === 'pause')
            playMusic();
        else
            pauseMusic();
    }
}

function nextMusic() {
    pauseMusic();
    currentPlay = (currentPlay + 1 > (playlist.length - 1)) ? 0 : currentPlay + 1;
    setAudio(playlist[currentPlay]);
    playMusic();
}

function prevMusic() {
    pauseMusic();
    currentPlay = (currentPlay - 1 < 0) ? (playlist.length - 1) : currentPlay - 1;
    setAudio(playlist[currentPlay]);
    playMusic();
}

function changeMusic(index) {
    pauseMusic();
    currentPlay = index;
    setAudio(playlist[currentPlay]);
    playMusic();
}

function playMusic() {
    audio.play();
    playerStatus = 'play';
    document.querySelector("#player .artist").innerHTML = playlist[currentPlay].artist;
    document.querySelector("#player .track").innerHTML = playlist[currentPlay].track;
    document.querySelector('#progress_area > #pointer').style.display = 'block';
    document.querySelector('#progress_area > #completed').style.display = 'block';
}

function pauseMusic() {
    audio.pause();
    playerStatus = 'pause';
}

function setAudio(context) {
    setSource(context.path);
    setCover(context.image.big);
}

function setCover(coverSrc) {
    document.querySelector("#cover").src = coverSrc;
}

function setSource(audioSrc) {
    if (audio.canPlayType('application/vnd.apple.mpegurl') || audioSrc.endsWith('.mp3')) {
        hls.detachMedia(audio);
        audio.src = audioSrc;
        //
        // If no native HLS support, check if HLS.js is supported
        //
    } else {
        hls.loadSource(audioSrc);
        hls.attachMedia(audio);
    }
}

// Update progress bar
function updateProgress(e) {
    const { duration, currentTime } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    document.querySelector('#progress_area > #pointer').style.left = `calc(${progressPercent}% - 10px)`;
    document.querySelector('#progress_area > #completed').style.width = `${progressPercent}%`;
}

function getPlayList() {
    fetch(window.origin + '/playlist', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(response => {
            playlist = response;
            appendPlaylist();
        })
        .catch(error => console.log(error));
}

function appendPlaylist() {
    for (index in playlist) {
        const item = document.createElement('div');
        item.style = 'width: calc(100% - 20px); display: flex; gap: 20px; align-items: center; margin: 10px; border: 1px solid lightgrey; cursor: pointer; border-radius: 3px; overflow: hidden;';
        item.dataset.trackid = index;
        item.setAttribute('onclick', `changeMusic(${index})`);
        item.innerHTML = `<img src="${playlist[index]['image']['small']}" alt="" style="height: 50px;width: 50px;">
                        <div style="display: flex; flex-direction: column;align-items: center; width: calc(100% - 80px);">
                            <span style="font-size: 20px;">${playlist[index]['artist']}</span>
                            <span style="font-size: 16px; color: rgb(120, 120, 120)">${playlist[index]['track']}</span>
                        </div>`
        document.querySelector('#playlist').append(item);
    }
}