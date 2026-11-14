import './style.css'

import * as THREE from 'three';
import grassTextureUrl from './assets/cartoon_texture_grass.jpg';
import brickTextureUrl from './assets/whitebrick_texture.jpg';
import nameTextureUrl from './assets/name.png';

import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);


// lights
const AmbientLight = new THREE.AmbientLight(0x404040);
AmbientLight.intensity = 5;
scene.add(AmbientLight);

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2);
scene.add( directionalLight );
directionalLight.position.set(-4, 6, 4);
directionalLight.rotation.y = Math.PI / 4;
directionalLight.rotation.x = Math.PI / 4;


// grass
const loader = new THREE.TextureLoader();
const texture = loader.load(grassTextureUrl);
texture.colorSpace = THREE.SRGBColorSpace;

// Repeat the texture across the plane
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(8, 8);

const grassGeometry = new THREE.PlaneGeometry(25, 25);
const grassMaterial = new THREE.MeshPhongMaterial({
  map: texture,
});

const grass = new THREE.Mesh(grassGeometry, grassMaterial);
grass.rotation.x = - Math.PI / 2;
grass.position.y = -1;
scene.add(grass);

//floor 1
const floor1Geometry = new THREE.BoxGeometry ( 7, 3, 3.5);
const floor1Material = new THREE.MeshPhongMaterial ( {color: 0x636363});
const floor1 = new THREE.Mesh (floor1Geometry, floor1Material);
floor1.position.set (2, 0, -2);
scene.add(floor1);

//garage
const garageGeometry = new THREE.BoxGeometry(5,3,6);
const garage = new THREE.Mesh (garageGeometry, floor1Material);
garage.position.set (-3.5,0,-1);
scene.add(garage);

// floor2
const floor2Texture = loader.load(brickTextureUrl);
const floor2Geometry = new THREE.BoxGeometry (12, 3, 4);
const floor2Material = new THREE.MeshToonMaterial( { map: floor2Texture } );

const floor2 = new THREE.Mesh(floor2Geometry,floor2Material);
floor2.position.set (0, 3, -2);
scene.add(floor2);

//window
const windowHouseGeometry = new THREE.BoxGeometry(8, 2, 0.5);
const windowHouse = new THREE.Mesh (windowHouseGeometry, floor1Material);
windowHouse.position.set (1, 3, -0.1);
scene.add(windowHouse);

const glassGeometry = new THREE.BoxGeometry(7.5, 1.5 ,0.6);
const glassMaterial = new THREE.MeshPhongMaterial( {color: 0x9fcad5})
const glass = new THREE.Mesh (glassGeometry, glassMaterial);
glass.position.set (1, 3, -0.1);
scene.add(glass);

//door
const doorGeometry = new THREE.BoxGeometry(1.5, 2 ,1);
const doorMaterial = new THREE.MeshPhongMaterial( {color: 0x814822})
const door = new THREE.Mesh (doorGeometry, doorMaterial);
door.position.set (0.5, 0, -0.7);
scene.add(door);

//port
const portGeometry = new THREE.BoxGeometry(3, 2 ,1);
const port = new THREE.Mesh (portGeometry, doorMaterial);
port.position.set (-3.5, 0, 1.6);
scene.add(port);

//name
const nameTexture = loader.load(nameTextureUrl);
const nameGeometry = new THREE.BoxGeometry(1, 0.5 ,1);
const nameMaterial = new THREE.MeshPhongMaterial( {map: nameTexture})
const name = new THREE.Mesh (nameGeometry, nameMaterial);
name.position.set (2, 0.5, -0.7);
scene.add(name);

// shed
const shedTexture = loader.load(brickTextureUrl);
const shedGeometry = new THREE.BoxGeometry (2, 2, 2);
const shedMaterial = new THREE.MeshToonMaterial( { map: shedTexture } );

const shed = new THREE.Mesh(shedGeometry,shedMaterial);
shed.position.set (8, 0, -8);
scene.add(shed);

const roofGeometry = new THREE.ConeGeometry( 1.5, 1, 4 );
const roofMaterial = new THREE.MeshPhongMaterial( { color: 0x636363 } );
const roof = new THREE.Mesh(roofGeometry, roofMaterial );
roof.rotation.y = Math.PI / 4;
roof.position.set(8, 1.5, -8);
scene.add( roof );

//cat model
const modelLoader = new GLTFLoader();
let catModel;

modelLoader.load(
  `${import.meta.env.BASE_URL}models/low_poly_cartoon_cat/scene.gltf`,
  function (gltf) {
    catModel = gltf.scene;

    catModel.scale.setScalar(0.002);
    catModel.position.set(4, -1, 2.5);
    scene.add(catModel);
  },
);

// cloud
const cloudMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });

for (let i = 0; i < 10; i++) {
  const cloud = new THREE.Group();

  function addCloudPuff(x, y, z, size) {
    const geometry = new THREE.SphereGeometry(size, 16, 16);
    const puff = new THREE.Mesh(geometry, cloudMaterial);
    puff.position.set(x, y, z);
    cloud.add(puff);
  }

  addCloudPuff(0, 0, 0, 0.7);
  addCloudPuff(0.8, 0.1, 0, 0.9);
  addCloudPuff(1.7, 0, 0, 0.7);

  cloud.position.set(
  Math.random() * 20 - 10,
  Math.random() * 4 + 6,   
  Math.random() * 20 - 10  
);
  scene.add(cloud);
}


camera.position.z = 5;

function animate( time ) {
 
  catModel.rotation.y = time * 0.001;
  
  renderer.render( scene, camera );
  controls.update();
}
