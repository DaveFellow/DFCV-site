import { Scene } from "../../components/bg/Scene";
import { UtilsService } from "../../services/utils.service";
import { VectorsUtils } from "../../utils/vectors";
import { AbstractState } from "./AbstractState";
import * as THREE from 'three';

export abstract class BGTransitionState extends AbstractState {
  protected duration: number = 1000;
  protected factor: number = 0;
  protected baseFOV = 50;
  protected isHomeState: boolean = false;

  protected initCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected destCamPosition: THREE.Vector3 = new THREE.Vector3;

  protected characterAnimationName?: string;
  protected characterAnimationSpeed?: number = 1;
  private canUpdateCharacterAnimation: boolean = false;

  public get getDestCamPosition(): THREE.Vector3 {
    return this.destCamPosition;
  }
  
  private deltaTime: number = 0;
  private initTime: number = 0;
  private totalTime: number = 0;

  private get fadeFactor() {
    return this.factor * 0.1;
  } 

  public get timeIsRunning(): boolean {
    return this.totalTime <= this.duration;
  }

  public get isTransitioning(): boolean {
    return this.factor < 1;
  }
  
  protected _debug: boolean = false;

  protected readonly utils = new UtilsService;
  protected readonly vectorsUtils: VectorsUtils;

  constructor(scene: Scene, name: string, characterAnimationName?: string, characterAnimationSpeed?: number) {
    super(scene, name);
    this.characterAnimationName = characterAnimationName;
    this.characterAnimationSpeed = characterAnimationSpeed || 1;
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

    (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity = 1;

    setTimeout(() => {
      this.canUpdateCharacterAnimation = true;
      this.initCharacterAnimation();
    }, this.duration / 2);

    setTimeout(() => this.additionalActions(), this.duration);
  }
  
  public override onAnimation(): void {
    if (this.canUpdateCharacterAnimation) {
      this.updateCharacterAnimation();
    }

    if (this.factor == 1) {
      const opacity = (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity;
      (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity = Math.min(1, opacity * (1 + this.fadeFactor));
      return;
    }
    
    const squaredFactor = Math.sqrt(this.totalTime / this.duration);
    this.factor = Math.min(squaredFactor, 1);
    this.setCameraPosition();
    this.setCameraTarget();
    this.setTime();

    const opacity = (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity;
    (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity = Math.max(0, opacity * (1 - this.fadeFactor));

    if (this.isHomeState) return;

    if (this.scene.camera.fov < this.baseFOV) {
      const remainingFOV = this.baseFOV - this.scene.camera.fov;
      this.scene.camera.fov += (remainingFOV * this.factor) * 0.9;
    } else {
      this.scene.camera.fov = 50;
    }
    this.scene.camera.updateProjectionMatrix();
  }

  public override onExit(): void {
    this.additionalActionsCleanup();
  }

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

  private initCharacterAnimation(): void {
    const animation = this.scene.characterModel.animations.find(anim => anim.name === this.characterAnimationName);
    if (!animation) return;
    this.scene.characterAnimMixer.stopAllAction();
    const action = this.scene.characterAnimMixer.clipAction(animation);
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.setEffectiveTimeScale(this.characterAnimationSpeed || 1);
    action.play();
  }

  private updateCharacterAnimation(): void {
    if (!this.characterAnimationName) return;
    this.scene.characterAnimMixer.update(this.utils.getDeltaTime());
  }

  protected additionalActions(): void {}

  protected additionalActionsCleanup(): void {}
}