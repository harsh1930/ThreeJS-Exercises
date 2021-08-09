import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap';
import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

@Component({
  selector: 'app-haunted-house',
  templateUrl: './haunted-house.component.html',
  styleUrls: ['./haunted-house.component.css']
})
export class HauntedHouseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      this.scene();
  }


  scene(){
    const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


// Scene
const scene = new THREE.Scene()

//Fog
const fog = new THREE.Fog('#262837', 1, 15)
scene.fog= fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/assets/textures2/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/assets/textures2/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/assets/textures2/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/assets/textures2/door/height.jpg')
const doorNormalTexture = textureLoader.load('/assets/textures2/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/assets/textures2/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/assets/textures2/door/roughness.jpg')

const bricksColorTexture = textureLoader.load('/assets/textures2/bricks/color.jpg')
const bricksAmbientOcclusionTexture = textureLoader.load('/assets/textures2/bricks/ambientOcclusion.jpg')
const bricksNormalTexture = textureLoader.load('/assets/textures2/bricks/normal.jpg')
const bricksRoughnessTexture = textureLoader.load('/assets/textures2/bricks/roughness.jpg')

const grassColorTexture = textureLoader.load('assets/textures2/grass/color.jpg')
const grassAmbientOcclusionTexture = textureLoader.load('/assets/textures2/grass/ambientOcclusion.jpg')
const grassNormalTexture = textureLoader.load('/assets/textures2/grass/normal.jpg')
const grassRoughnessTexture = textureLoader.load('/assets/textures2/grass/roughness.jpg')

grassColorTexture.repeat.set(8,8)
grassAmbientOcclusionTexture.repeat.set(8,8)
grassNormalTexture.repeat.set(8,8)
grassRoughnessTexture.repeat.set(8,8)

grassColorTexture.wrapS = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
grassNormalTexture.wrapS = THREE.RepeatWrapping
grassRoughnessTexture.wrapS = THREE.RepeatWrapping

grassColorTexture.wrapT = THREE.RepeatWrapping
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
grassNormalTexture.wrapT = THREE.RepeatWrapping
grassRoughnessTexture.wrapT = THREE.RepeatWrapping

/**
 * House
 */

// Group
const house = new THREE.Group()
scene.add(house)

//Walls
const walls =new THREE.Mesh(new THREE.BoxGeometry(4,2.5,4),
new THREE.MeshStandardMaterial({map:bricksColorTexture,
                                aoMap:bricksAmbientOcclusionTexture,
                                normalMap: bricksNormalTexture,
                                roughnessMap: bricksRoughnessTexture}))

walls.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2))

walls.position.y = 2.5/2;
house.add(walls);

//Roof
const roof = new THREE.Mesh(new THREE.ConeGeometry(3.5,1,4),
new THREE.MeshStandardMaterial({color: '#b35f45'}))
roof.position.y = 2.5 + 1/2;
roof.rotation.y = Math.PI /4;
house.add(roof)

//door
const door = new THREE.Mesh(new THREE.PlaneGeometry(2,2, 100, 100),
            new THREE.MeshStandardMaterial({map:doorColorTexture,
                                                transparent: true,
                                                alphaMap: doorAlphaTexture,
                                                aoMap: doorAmbientOcclusionTexture,
                                                displacementMap:doorHeightTexture,
                                                displacementScale: 0.2,
                                                normalMap: doorNormalTexture,
                                                metalnessMap: doorMetalnessTexture,
                                                roughnessMap: doorRoughnessTexture}))

door.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2))

door.position.z = 2.01;
door.position.y = 1;
house.add(door)

//bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.1, 2.1)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(- 0.8, 0.1, 2.2)

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(- 1, 0.05, 2.6)

house.add(bush1, bush2, bush3, bush4)

//Graves
const graves = new THREE.Group();

const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color:'#b2b6b1'});

for(let i = 0; i< 50; i++ ){
    
    const angle = Math.random()* Math.PI *2;
    const radius = Math.random() *3 + 5;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    const grave = new THREE.Mesh(graveGeometry,graveMaterial);
    grave.position.set(x,0.8/2,z)
    grave.castShadow = true;
    graves.add(grave);
}
scene.add(graves)
// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({map: grassColorTexture,
                                    aoMap: grassAmbientOcclusionTexture,
                                    normalMap: grassNormalTexture,
                                    roughnessMap: grassRoughnessTexture})
);
floor.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2))

floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12);
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12);
moonLight.position.set(4, 5, - 2);
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001);
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001);
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001);
scene.add(moonLight);;
;
//Door light;
const doorLight = new THREE.PointLight('#ff7d46', 1,7);
doorLight.position.set(0,2.2,2.7);
house.add(doorLight);

/**
 * Ghosts
 */

const ghost = new THREE.PointLight('#ff00ff',2,3);
const ghost2 = new THREE.PointLight('#00ffff',2,3);
const ghost3 = new THREE.PointLight('#ffff00',2,3);
scene.add(ghost, ghost2);
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    
})
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen();
    }
    else {
      document.exitFullscreen();
    }
  })

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor('#262837');

/**
 * Shadows
 */
renderer.shadowMap.enabled = true;

moonLight.castShadow = true;
doorLight.castShadow = true;
ghost.castShadow = true;
ghost2.castShadow = true;
walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;



doorLight.shadow.mapSize.width = 256;
doorLight.shadow.mapSize.height = 256;
doorLight.shadow.camera.far = 7;

ghost.shadow.mapSize.width = 256;
ghost.shadow.mapSize.height = 256;
ghost.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

renderer.shadowMap.type = THREE.PCFSoftShadowMap;


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Update ghost
    const ghostAngle = elapsedTime *0.8; 
    const x = Math.cos(ghostAngle ) *5;
    const z = Math.sin(ghostAngle ) *5;

    const ghost2Angle = elapsedTime *0.3;
    ghost2.position.x = Math.sin(ghost2Angle) *8;
    ghost2.position.z = Math.cos(ghost2Angle) *8;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 8);
   


    ghost.position.set(x,0,z)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
  }
}
