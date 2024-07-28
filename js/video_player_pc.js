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
        addComment("動画が再生されました");
    })

    btn_pause.addEventListener('click', () => {
        video.pause();
        btn_pause.style.display = 'none';
        btn_play.style.display = 'inline';
        addComment("動画が停止されました");
    })

/*
    btn_reset.addEventListener('click', e => {
        video.currentTime = 0;
    });
*/

    btn_back.addEventListener('click', e => {
        video.currentTime -= 10;
        addComment("10秒戻りました");
    });

    btn_forward.addEventListener('click', e => {
        video.currentTime += 10;
        addComment("10秒進みました");
    });

    btn_normal.addEventListener('click', e => {
        video.playbackRate = 1.0;
        show_speed.innerText = "1倍速";
        inp_speed.value = 1.0;
        addComment("再生速度をリセットしました");
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
        addComment("エラー");
    })

    const setSpeed = (val) => {
        show_speed.innerText = inp_speed.value + "倍速";
        addComment(inp_speed.value + "倍速になりました");
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
        addComment(show_current_minute.innerText + ":" + show_current_second.innerText + "に飛びました");
    }

    const currentOnChange = (e) => {
        video.currentTime = video.duration * (inp_seekbar.value / 100);
        setCurrent(e.target.value);
    }

    const setVolume = (val) => {
        show_volume.innerText = val;
        addComment("音量を" + show_volume.innerText + "にしました");
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
        loadComments();
    }

    document.addEventListener('keydown', event => {
        let keys = event.key;
        if (keys == 'ArrowRight') {
            video.currentTime += 10;
            addComment("10秒進みました");
        } else if (keys == 'ArrowLeft') {
            video.currentTime -= 10;
            addComment("10秒戻りました");
        } else if (keys == ' ') {
            if (btn_pause.style.display == 'inline') {
                video.pause();
                btn_pause.style.display = 'none';
                btn_play.style.display = 'inline';
                addComment("動画が停止されました");
            } else if (btn_play.style.display == 'inline') {
                video.play();
                btn_play.style.display = 'none';
                btn_pause.style.display = 'inline';
                addComment("動画が再生されました");
            } else {alert('予期しないエラーです。管理者にお知らせください。理由：再生ボタン停止ボタン消失')}
        }
    });

    const commentContainer = document.getElementById('comment_container');
    const commentText = document.getElementById('comment_text');
    const sendCommentButton = document.getElementById('send_comment');

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(comment => {
            addComment(comment.text);
        });
    }

    function saveComment(text) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push({ text });
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function addComment(text) {
        const comment = document.createElement('div');
        comment.className = 'comment';
        comment.innerText = text;
        comment.style.top = `${Math.random() * 90}%`;
        commentContainer.appendChild(comment);

        comment.addEventListener('animationend', () => {
            commentContainer.removeChild(comment);
        });
    }

    sendCommentButton.addEventListener('click', () => {
        const text = commentText.value;
        if (text) {
            addComment(text);
            saveComment(text);
            commentText.value = '';
        }
    });

    commentText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendCommentButton.click();
        }
    });

