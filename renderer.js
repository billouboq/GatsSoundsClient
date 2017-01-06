'use strict';

let player, videoId;
const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubePlayerAPIReady = function() {

    const socket = io('http://164.132.42.175:1234');

    socket.on('video', startVideo);
    socket.on('play', playVideo);
    socket.on('pause', pauseVideo);
    socket.on('stop', stopVideo);

};

function startVideo(id) {
    console.log('start');
    if (videoId === id) {
        stopVideo();
    } else {

        if (player && player.playVideo) {
            player.destroy();
        }
        console.log('in new player');

        player = new YT.Player('player', {
            height: '400',
            width: '400',
            videoId: id,
            playerVars: {
                controls:0,
                showinfo: 0,
                rel: 0,
                showsearch: 0,
                iv_load_policy: 3,
                enablejsapi: 1,
            },
            events: {
                'onReady': onPlayerReady,
            }
        });
    }
}

function playVideo() {
    console.log('play');
    if (player && player.playVideo && typeof player.playVideo === 'function') {
      player.playVideo();
    }
}

function pauseVideo() {
    console.log('pause');
    if (player && player.pauseVideo && typeof player.pauseVideo === 'function') {
      player.pauseVideo();
    }
}

function stopVideo() {
    console.log('stop');
    if (player && player.stopVideo && typeof player.stopVideo === 'function') {
       player.stopVideo();
    }
}

function onPlayerReady(event) {
    console.log('on player ready');
    event.target.setVolume(100);
    if (player && player.getVideoData) {
        videoId = player.getVideoData()['video_id'];
    }
}

