import { Scene } from "../../components/bg/Scene";
import { AbstractState } from "./AbstractState";
import * as THREE from 'three';

export abstract class BGTransitionState extends AbstractState {
  protected duration = 1500;

  protected initCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected destCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected targetIndex: number = 0;
  
  private deltaTime: number = 0;
  private initTime: number = 0;
  private totalTime: number = 0;
  
  protected _debug: boolean = false;

  constructor(scene: Scene) {
    super(scene);
  }

  public override onEnter(): void {
    this.scene.trackMarker(this.targetIndex);
    this.deltaTime = 0;
    this.totalTime = 0;
    this.initTime = 0;

    const camPos = this.scene.camera.position;
    this.initCamPosition = new THREE.Vector3(camPos.x, camPos.y, camPos.z);
  }

  public override onAnimation(): void {
    if (this.totalTime > this.duration) return;

    if (this.scene.prevMarkerIsValid) {
      let factor = this.totalTime / this.duration;
      const steppedRotation = this.scene.getSteppedRotation(factor);
      // console.log(factor);
      
      this.scene.camera.position.lerpVectors(this.initCamPosition, this.destCamPosition, factor);
      this.scene.camera.lookAt(steppedRotation);

    } else {
      this.scene.camera.lookAt(this.scene.nextMarker);
      this.scene.camera.position.set(this.destCamPosition.x, this.destCamPosition.y, this.destCamPosition.z);
    }

    this.setTime();
  }

  public override onExit(): void {}

  private setTime(): void {
    if (this.initTime != 0)
      this.deltaTime = new Date().valueOf() - this.initTime;
    
    this.initTime = new Date().valueOf();
    this.totalTime += this.deltaTime;
  }
}