let camera;
let scene;
let renderer;
let mesh;
init();
animate();

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    const geometry = new THREE.CubeGeometry(20, 20, 20);
    const video = document.getElementById('videoSky');
    video.play();
    const runVideo = () => {
      video.play();
      document.removeEventListener('click', runVideo)
    };
    document.addEventListener('click', runVideo)
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.NearestFilter;
    const material = new THREE.MeshPhongMaterial({ map: videoTexture });
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.z = -50;
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 1, 1).normalize();
    scene.add(light).add(mesh);
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