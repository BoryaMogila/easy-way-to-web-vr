const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const light = new BABYLON.PointLight(
        "Omni", new BABYLON.Vector3(0, 100, 100), scene
    );
    const camera = new BABYLON.ArcRotateCamera(
        "Camera", 0, 0.8, 100, new BABYLON.Vector3.Zero(), scene
    );
    camera.attachControl(canvas, true);
    const box = BABYLON.Mesh.CreateBox("Box1", 20.0, scene);
    box.position.x = -20;
    box.rotation.x = 150;
    const videoMat = new BABYLON.StandardMaterial("textVid", scene);
    const videoTexture = videoMat.diffuseTexture = new BABYLON.VideoTexture(
        "video", ["../static/vinnitsiavr.mp4"], scene, false
    );
    videoTexture.video.muted= true;
    scene.onPointerDown = function () {
      videoTexture.video.play()
    }

  videoMat.backFaceCulling = false;
    const keys = [];
    keys.push({
        frame: 0,
        value: 0
    });
    keys.push({
        frame: 360,
        value: 13
    });
    box.material = videoMat;
    const animationX = new BABYLON.Animation(
        "rotationXAnimation",
        "rotation.x",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
    );
    animationX.setKeys(keys);
    box.animations.push(animationX);
    scene.beginAnimation(box, 0, 360, true);
    const animationY = new BABYLON.Animation(
        "rotationYAnimation",
        "rotation.y",
        30,
        BABYLON.Animation.ANIMATIONTYPE_FLOAT,
        BABYLON.Animation.ANIMATIONLOOPMODE_RELATIVE
    );
    animationY.setKeys(keys);
    box.animations.push(animationY);
    scene.beginAnimation(box, 0, 360, true);
    return scene;
}
const scene = createScene()
engine.runRenderLoop(function () {
    if (scene) {
        scene.render();
    }
});
window.addEventListener("resize", function () {
    engine.resize();
});