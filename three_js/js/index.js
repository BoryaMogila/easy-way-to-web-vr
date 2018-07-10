let camera;
let scene;
let renderer;
let mesh;
init();
animate();

function setupVideo(url) {
    const video = document.createElement('video');
    let playing = false;
    let timeupdate = false;
    let copyVideo = false;
    video.autoplay = true;
    video.loop = true;
    video.addEventListener('playing', function() {
        playing = true;
        checkReady();
    }, true);
    video.addEventListener('timeupdate', function() {
        timeupdate = true;
        checkReady();
    }, true);
    video.src = url;
    video.play();

    function checkReady() {
        if (playing && timeupdate) {
            copyVideo = true;
        }
    }
    return video;
}

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);
    const geometry = new THREE.CubeGeometry(20, 20, 20);
    const video = document.getElementById('videoSky');
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.format = THREE.RGBFormat;
    const material = new THREE.MeshPhongMaterial({ map: videoTexture });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -50;
    scene.add(mesh);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild(renderer.domElement);
    render();
}

function animate() {
    mesh.rotation.x += 0.03;
    mesh.rotation.y += 0.02;
    render();
    requestAnimationFrame(animate);
}

function render() {
    renderer.render(scene, camera);
}