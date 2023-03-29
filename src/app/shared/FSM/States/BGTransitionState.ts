import { Scene } from "../../components/bg/Scene";
import { VectorsUtils } from "../../utils/vectors";
import { AbstractState } from "./AbstractState";
import * as THREE from 'three';

export abstract class BGTransitionState extends AbstractState {
  protected duration = 500;

  protected initCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected destCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected targetIndex: number = 0;
  
  private deltaTime: number = 0;
  private initTime: number = 0;
  private totalTime: number = 0;
  
  protected _debug: boolean = false;

  protected readonly vectorsUtils: VectorsUtils;

  constructor(scene: Scene) {
    super(scene);
    this.vectorsUtils = new VectorsUtils;
  }

  public override onEnter(): void {
    this.deltaTime = 0;
    this.totalTime = 0;
    this.initTime = 0;
    
    this.scene.trackMarker(this.targetIndex);
    const camPos = this.scene.camera.position;
    this.initCamPosition = this.vectorsUtils.copyPosition(camPos);
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
      const steppedRotation = this.scene.getSteppedRotation(1);
      this.scene.camera.lookAt(steppedRotation);
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