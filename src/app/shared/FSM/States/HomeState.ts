import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HomeState extends BGTransitionState {
  private ready = false;

  constructor(scene: Scene, name: string = '/home') {
    super(scene, name);
    this.isHomeState = true;
  }
  
  public override onEnter(): void {
    if (this.ready === false) {
      this.scene.lastOrbitPosition = new THREE.Vector3(-75.45200245539156, 67.18014334339586, 72.48295059870483);
      this.scene.camera.position.set(this.scene.lastOrbitPosition.x, this.scene.lastOrbitPosition.y, this.scene.lastOrbitPosition.z);
      this.ready = true;
    }

    this.scene.markers[this.name].position = this.scene.lastOrbitPosition.clone();

    super.onEnter();

    setTimeout(() => this.scene.canControl = true, this.duration);
    this.scene.orbitControls.enabled = true;
  }

  public override onAnimation(): void {
    super.onAnimation();    

    if (this.scene.camera.fov > 25) {
      const remainingFOV = this.scene.camera.fov - 25;
      this.scene.camera.fov -= (remainingFOV * this.factor) * 0.9;
    } else {
      this.scene.camera.fov = 25;
    }
    this.scene.camera.updateProjectionMatrix();
  }

  public override onExit(): void {
    this.scene.lastOrbitPosition = this.scene.camera.position.clone();
  }
}