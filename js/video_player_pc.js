    const btn_play = document.getElementById('play');
    const btn_pause = document.getElementById('pause');
//    const btn_reset = document.getElementById('reset');
    const btn_back = document.getElementById('back');
    const inp_seekbar = document.getElementById('seekbar');
    const show_current_minute = document.getElementById('current-show-minute');
    const show_current_second = document.getElementById('current-show-second');
    const show_duration = document.getElementById('duration-show');
    const btn_forward = document.getElementById('forward');
    const inp_volume = document.getElementById('volume');
    const show_volume = document.getElementById('volume-show');
    const btn_normal = document.getElementById('normal');
    const inp_speed = document.getElementById('speed');
    const show_speed = document.getElementById('speed-show');
    const video = document.querySelector('video');

    video.volume = 0.1
    inp_volume.value = video.volume * 100;
    inp_seekbar.value = 0;
    inp_speed.value = 1.0;
    show_speed.innerText = inp_speed.value + "倍速";

    function numDigits(num){
        return num.toString().length;
    }

    btn_play.addEventListener('click', () => {
        video.play();
        btn_play.style.display = 'none';
        btn_pause.style.display = 'inline';
    })

    btn_pause.addEventListener('click', () => {
        video.pause();
        btn_pause.style.display = 'none';
        btn_play.style.display = 'inline';
    })

/*
    btn_reset.addEventListener('click', e => {
        video.currentTime = 0;
    });
*/

    btn_back.addEventListener('click', e => {
        video.currentTime -= 10;
    });

    btn_forward.addEventListener('click', e => {
        video.currentTime += 10;
    });

    btn_normal.addEventListener('click', e => {
        video.playbackRate = 1.0;
    });

    video.addEventListener('timeupdate', e => {
        inp_seekbar.value = (video.currentTime / video.duration) * 100;
        show_current_minute.innerText = Math.trunc(video.currentTime / 60);
        if (numDigits(Math.trunc(video.currentTime - (show_current_minute.innerText*60))) >= 2) {
            show_current_second.innerText = Math.trunc(video.currentTime - (show_current_minute.innerText*60));
        } else {
            show_current_second.innerText = "0" + Math.trunc(video.currentTime - (show_current_minute.innerText*60));
        }

        if (numDigits(Math.trunc(video.duration - (Math.trunc(video.duration / 60)*60))) >= 2) {
            show_duration.innerText = Math.trunc(video.duration / 60) + ":" + Math.trunc(video.duration - (Math.trunc(video.duration / 60)*60));
        } else {
            show_duration.innerText = Math.trunc(video.duration / 60) + ":0" + Math.trunc(video.duration - (Math.trunc(video.duration / 60)*60));
        }

    });

    video.addEventListener('error', e => {
        alert('エラー');
    })

    const setSpeed = (val) => {
        show_speed.innerText = inp_speed.value + "倍速";
    }

    const speedOnChange = (e) => {
        video.playbackRate = inp_speed.value;
        setSpeed(e.target.value);
    }

    const setCurrent = (val) => {
        show_current_minute.innerText = Math.trunc(val / 60);
        if (numDigits(Math.trunc(val - (show_current_minute.innerText*60))) >= 2) {
            show_current_second.innerText = Math.trunc(val - (show_current_minute.innerText*60));
        } else {
            show_current_second.innerText = "0" + Math.trunc(val - (show_current_minute.innerText*60));
        }

        if (numDigits(Math.trunc(video.duration - (Math.trunc(video.duration / 60)*60))) >= 2) {
            show_duration.innerText = Math.trunc(video.duration / 60) + ":" + Math.trunc(video.duration - (Math.trunc(video.duration / 60)*60));
        } else {
            show_duration.innerText = Math.trunc(video.duration / 60) + ":0" + Math.trunc(video.duration - (Math.trunc(video.duration / 60)*60));
        }
    }

    const currentOnChange = (e) => {
        video.currentTime = video.duration * (inp_seekbar.value / 100);
        setCurrent(e.target.value);
    }

    const setVolume = (val) => {
        show_volume.innerText = val;
    }

    const volumeOnChange = (e) => {
        setVolume(e.target.value);
        video.volume = inp_volume.value / 100;
    }

    window.onload = () => {
        inp_volume.addEventListener('input', volumeOnChange);
        inp_seekbar.addEventListener('input', currentOnChange);
        inp_speed.addEventListener('input', speedOnChange);
        setVolume(inp_volume.value);
        setCurrent(inp_seekbar.value);
        setSpeed(inp_speed.value);
    }

    document.addEventListener('keydown', event => {
        let keys = event.key;
        if (keys == 'ArrowRight') {
            video.currentTime += 10;
        } else if (keys == 'ArrowLeft') {
            video.currentTime -= 10;
        } else if (keys == ' ') {
            if (btn_pause.style.display == 'inline') {
                video.pause();
                btn_pause.style.display = 'none';
                btn_play.style.display = 'inline';
            } else if (btn_play.style.display == 'inline') {
                video.play();
                btn_play.style.display = 'none';
                btn_pause.style.display = 'inline';
            } else {alert('予期しないエラーです。管理者にお知らせください。理由：再生ボタン停止ボタン消失')}
        }
    });