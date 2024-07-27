    const btn_play_sp = document.getElementById('play-sp');
    const btn_pause_sp = document.getElementById('pause-sp');
//    const btn_reset_sp = document.getElementById('reset-sp');
    const btn_back_sp = document.getElementById('back-sp');
    const inp_seekbar_sp = document.getElementById('seekbar-sp');
    const show_current_minute_sp = document.getElementById('current-show-minute-sp');
    const show_current_second_sp = document.getElementById('current-show-second-sp');
    const show_duration_sp = document.getElementById('duration-show-sp');
    const btn_forward_sp = document.getElementById('forward-sp');
    const inp_volume_sp = document.getElementById('volume-sp');
    const show_volume_sp = document.getElementById('volume-show-sp');
    const video_sp = document.querySelector('video');

    video_sp.volume = 0.1
    inp_volume_sp.value = video_sp.volume * 100;
    inp_seekbar_sp.value = 0;

    function numDigits_sp(num){
        return num.toString().length;
    }

    btn_play_sp.addEventListener('click', () => {
        video_sp.play();
        btn_play_sp.style.display = 'none';
        btn_pause_sp.style.display = 'inline';
    })

    btn_pause_sp.addEventListener('click', () => {
        video_sp.pause();
        btn_pause_sp.style.display = 'none';
        btn_play_sp.style.display = 'inline';
    })

/*
    btn_reset_sp.addEventListener('click', e => {
        video_sp.currentTime = 0;
    });
*/

    btn_back_sp.addEventListener('click', e => {
        video_sp.currentTime -= 10;
    });

    video_sp.addEventListener('timeupdate', e => {
        inp_seekbar_sp.value = (video_sp.currentTime / video_sp.duration) * 100;
        show_current_minute_sp.innerText = Math.trunc(video_sp.currentTime / 60);
        if (numDigits_sp(Math.trunc(video_sp.currentTime - (show_current_minute_sp.innerText*60))) >= 2) {
            show_current_second_sp.innerText = Math.trunc(video_sp.currentTime - (show_current_minute_sp.innerText*60));
        } else {
            show_current_second_sp.innerText = "0" + Math.trunc(video_sp.currentTime - (show_current_minute_sp.innerText*60));
        }

        if (numDigits_sp(Math.trunc(video_sp.duration - (Math.trunc(video_sp.duration / 60)*60))) >= 2) {
            show_duration_sp.innerText = Math.trunc(video_sp.duration / 60) + ":" + Math.trunc(video_sp.duration - (Math.trunc(video_sp.duration / 60)*60));
        } else {
            show_duration_sp.innerText = Math.trunc(video_sp.duration / 60) + ":0" + Math.trunc(video_sp.duration - (Math.trunc(video_sp.duration / 60)*60));
        }

    });

    const setCurrent_sp = (val) => {
        show_current_minute_sp.innerText = Math.trunc(val / 60);
        if (numDigits_sp(Math.trunc(val - (show_current_minute_sp.innerText*60))) >= 2) {
            show_current_second_sp.innerText = Math.trunc(val - (show_current_minute_sp.innerText*60));
        } else {
            show_current_second_sp.innerText = "0" + Math.trunc(val - (show_current_minute_sp.innerText*60));
        }

        if (numDigits_sp(Math.trunc(video_sp.duration - (Math.trunc(video_sp.duration / 60)*60))) >= 2) {
            show_duration_sp.innerText = Math.trunc(video_sp.duration / 60) + ":" + Math.trunc(video_sp.duration - (Math.trunc(video_sp.duration / 60)*60));
        } else {
            show_duration_sp.innerText = Math.trunc(video_sp.duration / 60) + ":0" + Math.trunc(video_sp.duration - (Math.trunc(video_sp.duration / 60)*60));
        }
    }

    const currentOnChange_sp = (e) => {
        setCurrent_sp(e.target.value);
        video_sp.currentTime = video_sp.duration * (inp_seekbar_sp.value / 100)
    }

    btn_forward_sp.addEventListener('click', e => {
        video_sp.currentTime += 10;
    });

    const setVolume_sp = (val) => {
        show_volume_sp.innerText = val;
    }

    const volumeOnChange_sp = (e) => {
        setVolume_sp(e.target.value);
        video_sp.volume = inp_volume_sp.value / 100;
    }

    window.onload = () => {
        inp_volume_sp.addEventListener('input', volumeOnChange_sp);
        inp_seekbar_sp.addEventListener('input', currentOnChange_sp);
        setVolume_sp(inp_volume_sp.value);
        setCurrent_sp(inp_seekbar_sp.value);
    }