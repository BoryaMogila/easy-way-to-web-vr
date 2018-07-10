const forvard = document.getElementById('forward');
const rotateR = document.getElementById('rotationR');
const rotateF = document.getElementById('rotationF');
const reward = document.getElementById('reward');
rotateF.addEventListener('animationend', function () {
    forvard.start();
    rotateR.start();
    rotateF.start();
    reward.start();
})