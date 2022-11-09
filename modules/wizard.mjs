//
// Akhmajon (Jon) Makhsadov for AllAboardLearning
// 8-Nov-2022
//

import { GLTFLoader } from "GLTFLoader";
import { Vector3, Object3D, Euler } from "THREE";

const THREE = window.MINDAR.FACE.THREE;
const mindarThree = new window.MINDAR.FACE.MindARThree({
  container: document.querySelector("#container"),
});
const { renderer, scene, camera } = mindarThree;

const loader = new GLTFLoader();

function loadModels() {
  const onLoadOccluder = (result, position, scale, parent) => {
    const model = result.scene;
    model.position.copy(position);
    model.scale.copy(scale);
    const occluderMaterial = new THREE.MeshStandardMaterial({
	    colorWrite: false,
    });
    model.traverse((o) => {
      if (o.isMesh) o.material = occluderMaterial;
    });
    parent.add(model);


  };

  const onLoad = (result, position, scale, rotation, parent) => {
    const model = result.scene;
    model.position.copy(position);
    model.scale.copy(scale);
    // TODO: check what's wrong with the copy method for rotation
    model.rotation.x = rotation.x;
    model.rotation.y = rotation.y;
    model.rotation.z = rotation.z;
    parent.add(model);
  };

  // OCCLUDER
  const occluderPosition = new Vector3(0, -0.3, 0.15);
  const occluderScale = new Vector3(0.065, 0.065, 0.065);

  loader.load(
    "./assets/headOccluder.glb",
    function (gltf) {
      onLoadOccluder(gltf, occluderPosition, occluderScale, noseBridge);
    },
    undefined,
    undefined
  );

  // HAT
  const hatPosition = new Vector3(0, -0.2, -0.5);
  const hatScale = new Vector3(0.04, 0.04, 0.04);
  const hatRotation = new Euler(Math.PI / 180 * -7, Math.PI / 180 * 45, 0);
  loader.load(
    "./assets/wizard-hat/scene.gltf",
    function (gltf) {
      onLoad(gltf, hatPosition, hatScale, hatRotation, forehead);
    },
    undefined,
    undefined
  );

  // BEARD
  const beardPosition = new Vector3(0, 0.25, -0.5);
  const beardScale = new Vector3(0.65, 0.5, 0.5);
  const beardRot = new Vector3(0, 0, 0);
  loader.load(
    "./assets/wizard-beard/wizard-beard.glb",
    function (gltf) {
      onLoad(gltf, beardPosition, beardScale, beardRot, bottomLip);
    },
    undefined,
    undefined
  );

  // MUSTACHE
  const mustachePosition = new Vector3(0, 0.25, -0.5);
  const mustacheScale = new Vector3(0.5, 0.65, 0.5);
  const mustacheRot = new Vector3(0, 0, 0);
  loader.load(
    "./assets/wizard-beard/wizard-mustache.glb",
    function (gltf) {
      onLoad(gltf, mustachePosition, mustacheScale, mustacheRot, upperLip);
    },
    undefined,
    undefined
  );
}
loadModels();

// LIGHTS
const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
scene.add(light);
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
scene.add( directionalLight );

// // FACE MESH
// const faceMesh = mindarThree.addFaceMesh();
// const texture = new THREE.TextureLoader().load(
//   "./assets/canonical_face_model_uv_visualization.png"
// );
// faceMesh.material.map = texture;
// faceMesh.material.transparent = true;
// faceMesh.material.needsUpdate = true;
// scene.add(faceMesh);

// // TEST SPHERE
// const geometry = new THREE.SphereGeometry(0.1, 32, 16);
// const material = new THREE.MeshBasicMaterial({
//   color: 0x00ffff,
//   transparent: true,
//   opacity: 0.5,
// });
// const sphere = new THREE.Mesh(geometry, material);

var noseTip = new Object3D();
var forehead = new Object3D();
var bottomLip = new Object3D();
var upperLip = new Object3D();
var noseBridge = new Object3D();

const anchorForehead = mindarThree.addAnchor(10);
const anchorUpperLip = mindarThree.addAnchor(0);
const anchorBottomLip = mindarThree.addAnchor(17);
const anchorNoseTip = mindarThree.addAnchor(1);
const anchorNoseBridge = mindarThree.addAnchor(168);

scene.add(noseTip);
scene.add(forehead);
scene.add(bottomLip);
scene.add(upperLip);
scene.add(noseBridge);
anchorNoseTip.group.add(noseTip);
anchorForehead.group.add(forehead);
anchorBottomLip.group.add(bottomLip);
anchorUpperLip.group.add(upperLip);
anchorNoseBridge.group.add(noseBridge);

const start = async () => {
  await mindarThree.start();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
  });
};
start();
