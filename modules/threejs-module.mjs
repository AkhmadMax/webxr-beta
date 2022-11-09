//
// Akhmajon Makhsadov for AllAboardLearning
// 7-Nov-2022
//

import { GLTFLoader } from "GLTFLoader";
import { Vector3, AnimationMixer, Object3D } from "THREE";

const loader = new GLTFLoader();
const mixers = [];

function loadModels() {
    const onLoad = (result, position, name) => {
    const model = result.scene;
    model.position.copy(position);
    model.scale.set(1.01, 1.01, 1.01);
    model.name = name;

    // // ANIMATION
    // if (result.animations.Length > 0) {
    //   const mixer = new AnimationMixer(model);
    //   mixers.push(mixer);
    //   const action = mixer.clipAction(animation);
    //   const animation = result.animations[0];
    //   action.play();
    // }

    maskParent.add(model);
  };
  const onProgress = (progress) => {};

  // HAT
  const hatPosition = new Vector3(0, 0, 0);
  loader.load(
    "../assets/wizard-hat/scene.gltf",
    function (gltf) {
      onLoad(gltf, hatPosition, "wizard-hat");
    },
    onProgress,
    function (error) {
      console.error(error);
    }
  );

  // BEARD
  const beardPosition = new Vector3(0, 0, 0);
  loader.load(
    "../assets/wizard-beard-orig-mat/wizard-beard.gltf",
    function (gltf) {
      onLoad(gltf, beardPosition, "wizard-beard");
    },
    onProgress,
    function (error) {
      console.error(error);
    }
  );
}
loadModels();

const THREE = window.MINDAR.FACE.THREE;
const mindarThree = new window.MINDAR.FACE.MindARThree({
  container: document.querySelector("#container"),
});
const { renderer, scene, camera } = mindarThree;

// LIGHT
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);

// // FACE MESH
const faceMesh = mindarThree.addFaceMesh();
const texture = new THREE.TextureLoader().load(
  "./assets/canonical_face_model_uv_visualization.png"
);
faceMesh.material.map = texture;
faceMesh.material.transparent = true;
faceMesh.material.needsUpdate = true;
scene.add(faceMesh);

// // TEST SPHERE
// const geometry = new THREE.SphereGeometry(0.1, 32, 16);
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ffff,
//   transparent: true,
//   opacity: 0.5,
// });
// const sphere = new THREE.Mesh(geometry, material);

const anchor = mindarThree.addAnchor(1);
var maskParent = new Object3D();
maskParent.name = 'maskParent';
scene.add(maskParent);
anchor.group.add(maskParent);

const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};
start();
