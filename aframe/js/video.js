const videoSky = document.getElementById('videoSky');
if (videoSky) {
    const runVideo = () => {
        videoSky.play();
        document.removeEventListener('click', runVideo)
    };
    document.addEventListener('click', runVideo)
}