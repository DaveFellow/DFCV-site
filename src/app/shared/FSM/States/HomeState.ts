import { Scene } from "../../components/bg/Scene";
import { CameraStateService } from "../../services/camera-state.service";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HomeState extends BGTransitionState {
  private ready = false;

  constructor(scene: Scene, name: string = '/home') {
    const characterAnimationSettings = { name: 'anim_0' };
    scene.lastOrbitPosition = new THREE.Vector3(75.45, 67.18, -72.483);
    super(scene, name, characterAnimationSettings);
    this.isHomeState = true;
  }
  
  public override onEnter(): void {
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