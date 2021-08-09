import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap';
import {OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui';
@Component({
  selector: 'app-solarsystem',
  templateUrl: './solarsystem.component.html',
  styleUrls: ['./solarsystem.component.css']
})
export class SolarsystemComponent implements OnInit {

  constructor() { }

  canvas: HTMLCanvasElement;
  camera: any;
  renderer: any;
  scene: any;



  sizes = {
    width: window.innerWidth,
    height:window.innerHeight
  }
  ngOnInit(): void {
   
  
    this.SpaceTime();
    this.events();
  }
 events(){
     window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth;
      this.sizes.height =  window.innerHeight;
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    })
 }

  SpaceTime(){

    this.canvas = document.querySelector(".solarSystem");
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, this.sizes.width/this.sizes.height );
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    const textureLoader = new THREE.TextureLoader();
    const dooColorTexture = textureLoader.load("/assets/sun2.jfif");
    const earthTexture= textureLoader.load("/assets/earth.jfif");

    const sunMaterial = new THREE.MeshBasicMaterial({map:dooColorTexture});
    const earthMaterial = new THREE.MeshBasicMaterial({map:earthTexture});

    const sun = new THREE.Mesh(new THREE.SphereGeometry(2,16,16),
                                  sunMaterial);
    sun.position.x = -2;
    const earth = new THREE.Mesh(new THREE.SphereGeometry(0.5,16,16),
                                  earthMaterial);
    earth.position.x = 5;
    this.scene.add(sun,earth);
    const controls = new OrbitControls(this.camera, this.canvas);
    // controls.enabled =false;
    //controls.enableDamping = true;
    this.scene.add(this.camera);
    this.camera.position.z = 14

    this.camera.lookAt(sun.position);
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const clock = new THREE.Clock();


   
    //gsap.to(group.position, {duration: 1, delay: 1,x:2})
    const tick = () => {

      const elapsedTime = clock.getElapsedTime();
      
      sun.rotation.y= 0.5* elapsedTime
      earth.rotation.y= 0.1* elapsedTime
      earth.position.x= -Math.cos(elapsedTime *0.5 ) *10;
      earth.position.z= Math.sin(elapsedTime *0.5) *10;
     

      controls.update();
      this.renderer.render(this.scene, this.camera);
      window.requestAnimationFrame(tick);
    }

    tick();
  }

}
