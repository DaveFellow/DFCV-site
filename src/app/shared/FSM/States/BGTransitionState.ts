import { Scene } from "../../components/bg/Scene";
import { UtilsService } from "../../services/utils.service";
import { VectorsUtils } from "../../utils/vectors";
import { AbstractState } from "./AbstractState";
import * as THREE from 'three';



// HOY TOCA ACTUALIZAR EL MODELO 3D PARA AÑADIRLO CON LAS TEXTURAS



export abstract class BGTransitionState extends AbstractState {
  protected duration: number = 1000;
  protected factor: number = 0;
  protected baseFOV = 50;
  protected isHomeState: boolean = false;

  protected initCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected destCamPosition: THREE.Vector3 = new THREE.Vector3;

  public get getDestCamPosition(): THREE.Vector3 {
    return this.destCamPosition;
  }
  
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

  protected readonly utils = new UtilsService;
  protected readonly vectorsUtils: VectorsUtils;

  constructor(scene: Scene, name: string) {
    super(scene, name);
    this.vectorsUtils = new VectorsUtils;
  }

  public override onEnter(): void {
    this.deltaTime = 0;
    this.totalTime = 0;
    this.initTime = 0;
    this.factor = 0;
    
    this.scene.trackMarker(this.name);
    this.destCamPosition = this.scene.nextMarker.position.clone();

    const camPos = this.scene.camera.position;
    this.initCamPosition = camPos.clone();
    
    this.scene.canControl = false;
    this.scene.orbitControls.enabled = false;
  }
  
  public override onAnimation(): void {
    if (this.factor == 1) return;
    const squaredFactor = Math.sqrt(this.totalTime / this.duration);
    this.factor = Math.min(squaredFactor, 1);
    this.setCameraPosition();
    this.setCameraTarget();
    this.setTime();

    if (this.isHomeState) return;

    if (this.scene.camera.fov < this.baseFOV) {
      const remainingFOV = this.baseFOV - this.scene.camera.fov;
      this.scene.camera.fov += (remainingFOV * this.factor) * 0.9;
    } else {
      this.scene.camera.fov = 50;
    }
    this.scene.camera.updateProjectionMatrix();
  }

  public override onExit(): void {}

  private setTime(): void {
    if (this.initTime != 0)
      this.deltaTime = new Date().valueOf() - this.initTime;
    
    this.initTime = new Date().valueOf();
    this.totalTime += this.deltaTime;
  }

  private setCameraPosition(): void {
    this.scene.camera.position.lerpVectors(this.initCamPosition, this.destCamPosition, this.factor);
  }

  private setCameraTarget(): void {
    const steppedRotation = this.scene.getSteppedRotation(this.factor);
    this.scene.camera.lookAt(steppedRotation);
  }
}