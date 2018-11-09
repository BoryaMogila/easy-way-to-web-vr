const scene = document.querySelector('a-scene');
const playerEl = document.querySelector('#player');
const score = document.querySelector('#score');
const up = document.querySelector('#up');
const down = document.querySelector('#down');

const bountyCount = 16;
const distance = 10;
let jumping = false;
const collectedIds = [];

playerEl.addEventListener('collide', function (e) {
  let collidedEl = e.detail.body.el;
  if (collectedIds.includes(collidedEl.id)) return;
  collectedIds.push(collidedEl.id);
  console.log('Player has collided with', collidedEl.id);

  document.getElementById('coinSound').dispatchEvent(new CustomEvent('coin'));

  setTimeout(function() {
    scene.removeChild(collidedEl);
  }, 0);

  let coins = parseFloat(score.dataset.coins);
  coins += 1;
  const text = score.getAttribute('text');
  text.value = coins === bountyCount ? 'You win!' : `${coins} coins`;
  score.setAttribute('text', text);
  score.dataset.coins = coins;
});

document.addEventListener('keydown', (e) => {
  if (e.key === ' ') {
    jump();
  }
});

window.addEventListener('devicemotion', (e) => {
  const accel = e.accelerationIncludingGravity;
  if (accel && accel.x > 20) {
    setTimeout(() => {
      jump();
    }, 500)
  }
}, true);

addBounty();

addClickToScene();

function jump() {
  if (!jumping) {
    jumping = true;
    const {x, z} = playerEl.components.position.data;
    up.data.from = `${x} 1.6 ${z}`;
    up.data.to = `${x} 5 ${z}`;
    down.data.from = `${x} 5 ${z}`;
    down.data.to = `${x} 1.6 ${z}`;
    up.start();
    down.start();
    playerEl.dispatchEvent(new CustomEvent('jump'));
    setTimeout(function(){
      jumping = false;
    }, 600)
  }
}

function addBounty() {
  for (let i = 0; i < bountyCount; i++) {
    const entity = document.createElement('a-entity');

    let angle = 360. / bountyCount * i;
    if (Math.random() > 0.5) {
      angle -= 360 / bountyCount + 8;
    }
    let posX = distance * Math.cos(angle / 180 * Math.PI);
    let posZ = -distance * Math.sin(angle / 180 * Math.PI);
    // model of the cat or balloon
    if (Math.random() > 0.5) {
      entity.setAttribute('position', { x: posX, y: 1.5, z: posZ });
    } else {
      entity.setAttribute('position', { x: posX, y: 4.5, z: posZ });
      let plane = document.createElement('a-plane');
      plane.setAttribute('width', 3);
      plane.setAttribute('height', 3);
      plane.setAttribute('position', { x: posX - 0.6, y: 4.5 - 0.1, z: posZ - 0.6 });
      plane.setAttribute('rotation', { x: 90, y: 0, z: 0 });
      plane.setAttribute('static-body', true);
      plane.setAttribute('visible', false);
      scene.appendChild(plane);
    }
    entity.setAttribute('dynamic-body', 'math: 200;shape: box');
    entity.setAttribute('id', `coin${i}`);
    entity.setAttribute('gltf-model', 'https://cdn.glitch.com/e7dd3067-584d-4fd4-928c-fb532e1a55d1%2Fcoin.glb?1541708089358')
    entity.setAttribute('scale', { x: 0.2, y: 0.2, z: 0.2 });
    entity.setAttribute('rotation', {
      x: 0,
      y: angle - 110,
      z: 0,
    });

    scene.appendChild(entity);
  }
}


function addClickToScene () {
  let moved = false;
  let mouseDown = false;
  const detectMove = (e) => {
    moved = true;
    window.removeEventListener('mousemove', detectMove);
    window.removeEventListener('touchmove', detectMove);
  };
  scene.addEventListener('mousedown', (e = {}) => {
    mouseDown = true;
    window.addEventListener('mousemove', detectMove);
    window.addEventListener('touchmove', detectMove);
  });
  scene.addEventListener('mouseup', (e = {}) => {
    window.removeEventListener('mousemove', detectMove);
    window.removeEventListener('touchmove', detectMove);
    if (!moved && mouseDown){
      const { detail: { intersection: { point: { x, z, y } = {} } = {} } = {} } = e;
      setTimeout(() => {
        playerEl.setAttribute('position', {y:1.6, x, z})
      }, 0);
    }
    moved = false;
    mouseDown = false;
  });
}
