import { Scene } from "../../components/bg/Scene";
import { AbstractState } from "./AbstractState";
import * as THREE from 'three';

export class SummaryState extends AbstractState {
  currentStep: number = 0;
  posDestination = new THREE.Vector3(14, 17.979, 18.911);
  rotDestination!: THREE.Euler;

  constructor(scene: Scene) {
    super(scene);
    this.name = 'summary';
  }

  public override onEnter(): void {
    this.scene.trackMarker(4);
    this.currentStep = 60;
    this.scene.render();

    // return;
    setTimeout(() => {
      console.log(this.scene.camera.rotation);
      console.log(this.rotDestination);
    }, 2000);
  }


  public override onAnimation(): void {
    if (!this.currentStep) return;

    const pos = this.scene.camera.position;
    const posDistance = this.posDestination.distanceTo(pos);
    const posLerpFactor = posDistance / 60;
    // const steppedRotation = this.getSteppedRotation();

    // this.scene.camera.lookAt(steppedRotation);
    this.scene.camera.position.lerpVectors(pos, this.posDestination, posLerpFactor);    

    this.currentStep--;
  }

  public override onExit(): void {
  }
}