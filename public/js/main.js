let playlist;
let currentPlay = 0, playerStatus = 'pause';
let audio;

document.addEventListener("DOMContentLoaded", () => {
    getPlayList();

    audio = new Audio();
    audio.addEventListener('ended', nextMusic);


    document.querySelector('img#play').addEventListener('click', playPause);

    document.querySelector('img#prev').addEventListener('click', prevMusic);

    document.querySelector('img#next').addEventListener('click', nextMusic);
});

function playPause() {
    if (!audio.src) {
        if (playlist) {
            audio.src = playlist[currentPlay].path;
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
    currentPlay = (currentPlay + 1 > 4) ? 0 : currentPlay + 1;
    audio.src = playlist[currentPlay].path;
    playMusic();
}

function prevMusic() {
    pauseMusic();
    currentPlay = (currentPlay - 1 < 0) ? 4 : currentPlay - 1;
    audio.src = playlist[currentPlay].path;
    playMusic();
}

function changeMusic(index) {
    pauseMusic();
    currentPlay = index;
    audio.src = playlist[currentPlay].path;
    playMusic();
}

function playMusic() {
    audio.play();
    playerStatus = 'play';
    document.querySelector("#player .artist").innerHTML = playlist[currentPlay].artist;
    document.querySelector("#player .track").innerHTML = playlist[currentPlay].track;
}

function pauseMusic() {
    audio.pause();
    playerStatus = 'pause';
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