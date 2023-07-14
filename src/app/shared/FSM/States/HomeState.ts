import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HomeState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/home';
    super.targetIndex = 0;
    super.isHomeState = true;
  }
  
  public override onEnter(): void {
    super.destCamPosition = this.scene.lastOrbitPosition
      ? this.vectorsUtils.copyPosition(this.scene.lastOrbitPosition)
      : new THREE.Vector3(-75.45200245539156, 67.18014334339586, 72.48295059870483);

    super.onEnter();
    setTimeout(() => this.scene.canControl = true, this.duration);
    this.scene.orbitControls.enabled = true;
    this.scene.camera.updateProjectionMatrix();
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
    this.scene.lastOrbitPosition = this.vectorsUtils.copyPosition(this.scene.camera.position);
  }
}