const video = document.getElementById('video');
const playPauseButton = document.getElementById('playPause');
const seekBar = document.getElementById('seekBar');
const muteButton = document.getElementById('mute');
const volumeBar = document.getElementById('volumeBar');
const fullScreenButton = document.getElementById('fullScreen');

playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = '一時停止';
    } else {
        video.pause();
        playPauseButton.textContent = '再生';
    }
});

video.addEventListener('timeupdate', () => {
    seekBar.value = (video.currentTime / video.duration) * 100;
});

seekBar.addEventListener('input', () => {
    video.currentTime = (seekBar.value / 100) * video.duration;
});

muteButton.addEventListener('click', () => {
    video.muted = !video.muted;
    muteButton.textContent = video.muted ? 'ミュート解除' : 'ミュート';
});

volumeBar.addEventListener('input', () => {
    video.volume = volumeBar.value;
});

fullScreenButton.addEventListener('click', () => {
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
    }
});

const comments = [
    { text: "面白い！", time: 5 },
    { text: "ここ好き", time: 10 },
    { text: "すごい！", time: 15 }
];

comments.forEach(comment => {
    setTimeout(() => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.textContent = comment.text;
        document.body.appendChild(commentElement);
        setTimeout(() => {
            commentElement.remove();
        }, 5000);
    }, comment.time * 1000);
});
