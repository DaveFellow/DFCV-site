import { Scene } from "../../components/bg/Scene";
import { VectorsUtils } from "../../utils/vectors";
import { AbstractState } from "./AbstractState";
import * as THREE from 'three';



// HOY TOCA ACTUALIZAR EL MODELO 3D PARA AÑADIRLO CON LAS TEXTURAS



export abstract class BGTransitionState extends AbstractState {
  protected duration: number = 1000;
  protected factor: number = 0;

  protected initCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected destCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected targetIndex: number = 0;

  public get getDestCamPosition(): THREE.Vector3 {
    return this.destCamPosition;
  }
  public get getTargetIndex(): number {
    return this.targetIndex;
  };
  
  private deltaTime: number = 0;
  private initTime: number = 0;
  private totalTime: number = 0;

  public get timeIsRunning(): boolean {
    return this.totalTime <= this.duration;
  }

  public get isTransitioning(): boolean {
    return this.factor < 1;
  }
  
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
    this.factor = 0;
    
    this.scene.trackMarker(this.targetIndex);
    const camPos = this.scene.camera.position;
    this.initCamPosition = this.vectorsUtils.copyPosition(camPos);
    
    this.scene.canControl = false;
  }
  
  public override onAnimation(): void {
    if (this.factor == 1) return;

    this.factor = Math.min(this.totalTime / this.duration, 1);
    
    if (this.scene.prevMarkerIsValid) {
      const steppedRotation = this.scene.getSteppedRotation(this.factor);
      this.scene.camera.position.lerpVectors(this.initCamPosition, this.destCamPosition, this.factor);
      this.scene.camera.lookAt(steppedRotation);

    } else {
      const steppedRotation = this.scene.getSteppedRotation(1);
      this.scene.camera.position.set(this.destCamPosition.x, this.destCamPosition.y, this.destCamPosition.z);
      this.scene.camera.lookAt(steppedRotation);
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