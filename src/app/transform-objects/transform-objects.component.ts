import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';

@Component({
  selector: 'app-transform-objects',
  templateUrl: './transform-objects.component.html',
  styleUrls: ['./transform-objects.component.css']
})
export class TransformObjectsComponent implements OnInit {

  constructor() { }




  camera: any;
  renderer: any;
  canvas: any;
  cursor = {
    x: 0,
    y: 0
  }

  sizes = {
    // width: window.innerWidth,
    // height: window.innerHeight
    width:600,
    height:800
  }

  ngOnInit(): void {

    this.transform();
    this.mouseEvent();
  }

  mouseEvent() {

    window.addEventListener('mousemove', (event) => {
      this.cursor.x = event.clientX / this.sizes.width - 0.5;
      this.cursor.y = -(event.clientY / this.sizes.height - 0.5);


    })
    // window.addEventListener('resize', () => {
    //   this.sizes.width = window.innerWidth;
    //   this.sizes.height =  window.innerHeight;
    //   this.camera.aspect = this.sizes.width / this.sizes.height;
    //   this.camera.updateProjectionMatrix();
    //   this.renderer.setSize(this.sizes.width, this.sizes.height);
    //   this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // })

    window.addEventListener('dblclick', () => {
      if (!document.fullscreenElement) {
        this.canvas.requestFullscreen();
      }
      else {
        document.exitFullscreen();
      }
    })
  }


  transform() {
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height);
    this.canvas = document.querySelector('.webgl');
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });



    const parameters = {

      color: 0xffffff,
      spin: () => {
        gsap.to(sphere.rotation, { duration: 1, x: sphere.rotation.x + 10 })
      }
    }


    //texture----------------------------------

    const textureLoader = new THREE.TextureLoader();
    const dooColorTexture = textureLoader.load("/assets/textures/door/color.jpg");
    const doorAlphaTexture = textureLoader.load("/assets/textures/door/alpha.jpg");
    const doorOcclusionTexture = textureLoader.load("/assets/textures/door/ambientOcclusion.jpg");
    const doorHeightTexture = textureLoader.load("/assets/textures/door/height.jpg");
    const doorMetalnessTexture= textureLoader.load("/assets/textures/door/metalness.jpg");
    const doorNormalTexture = textureLoader.load("/assets/textures/door/normal.jpg");
    const doorRoughnessTexture = textureLoader.load("/assets/textures/door/roughness.jpg");
    const matcapTextures = textureLoader.load("/assets/textures/matcaps/1.png");
    const gradients = textureLoader.load("/assets/textures/matcaps/3.png");
    

    //Objects/ Material-----------------------------------

    const material = new THREE.MeshBasicMaterial();


    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5,16,16),
                                  material);
    sphere.position.x= -2;

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1), 
                                  material);


    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3,0.2,16,32), material); 
    torus.position.x = 2;
    scene.add(sphere,plane, torus);
   
    //light ---------------------------

    const light = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(light)
              
    //scene---------------------------------------
    
   

    //debug-------------------------------------

    // const gui = new dat.GUI();
    // gui.add(cube1.position, 'y').min(-3).max(3).step(0.1)

    // gui.add(cube1, 'visible');


    // gui.addColor(parameters, 'color').onChange(() => {
    //   material.color.set(parameters.color)
    // })
    // gui.add(parameters, 'spin')
    // camera---------------------------------


    this.camera.position.z = 6;

    scene.add(this.camera);

    //orbit
    const controls = new OrbitControls(this.camera, this.canvas);
    // controls.enabled =false;
    controls.enableDamping = true;
    // rendered

    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    let time = Date.now();
    const clock = new THREE.Clock();

    //gsap.to(group.position, {duration: 1, delay: 1,x:2})
    const tick = () => {

      const elapsedTime = clock.getElapsedTime();
      
      sphere.rotation.x= 0.5* elapsedTime
      torus.rotation.x= 0.5* elapsedTime
      plane.rotation.x=0.5* elapsedTime

      sphere.rotation.y= 0.5* elapsedTime
      torus.rotation.y= 0.5* elapsedTime
      plane.rotation.y=0.5* elapsedTime

      controls.update();
      this.renderer.render(scene, this.camera);
      window.requestAnimationFrame(tick);
    }

    tick();
  }

}
