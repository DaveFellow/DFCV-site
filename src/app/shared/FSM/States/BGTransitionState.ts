import { Scene } from "../../components/bg/Scene";
import { CharacterAnimationSettings } from "../../models/CharacterAnimationSettings";
import { UtilsService } from "../../services/utils.service";
import { VectorsUtils } from "../../utils/vectors";
import { AbstractState } from "./AbstractState";
import * as THREE from 'three';

export abstract class BGTransitionState extends AbstractState {
  protected duration: number = 1500;
  protected factor: number = 0;
  protected baseFOV = 40;
  protected isHomeState: boolean = false;

  protected initCamPosition: THREE.Vector3 = new THREE.Vector3;
  protected destCamPosition: THREE.Vector3 = new THREE.Vector3;

  protected characterAnimationSettings: CharacterAnimationSettings;
  private canUpdateCharacterAnimation: boolean = false;

  public get getDestCamPosition(): THREE.Vector3 {
    return this.destCamPosition;
  }
  
  private deltaTime: number = 0;
  private initTime: number = 0;
  private totalTime: number = 0;

  private get fadeFactor() {
    return this.factor * 0.2;
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

  characterAnimTimeout: any = null;
  additionalActionsTimeout: any = null;

  constructor(scene: Scene, name: string, characterAnimationSettings?: CharacterAnimationSettings) {
    super(scene, name);
    this.characterAnimationSettings = {
      name: characterAnimationSettings?.name || '',
      speed: characterAnimationSettings?.speed || 1,
    }
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

    this.characterAnimTimeout = setTimeout(() => {
      this.canUpdateCharacterAnimation = true;
      this.initCharacterAnimation();
    }, this.duration / 2);

    this.additionalActionsTimeout = setTimeout(() => this.additionalActions(), this.duration);
  }
  
  public override onAnimation(): void {
    if (this.canUpdateCharacterAnimation) {
      this.updateCharacterAnimation();
    }

    if (this.factor == 1) {
      this.characterFadeIn();
      return;
    }
    
    const squaredFactor = this.easeInOutCubic(this.totalTime / this.duration);
    this.factor = Math.min(squaredFactor, 1);
    this.setCameraPosition();
    this.setCameraTarget();
    this.setTime();
    this.characterFadeOut();

    if (this.isHomeState) return;

    if (this.scene.camera.fov < this.baseFOV) {
      const remainingFOV = this.baseFOV - this.scene.camera.fov;
      this.scene.camera.fov += (remainingFOV * this.factor) * 0.9;
    } else {
      this.scene.camera.fov = this.baseFOV;
    }
    this.scene.camera.updateProjectionMatrix();
  }

  public override onExit(): void {
    clearTimeout(this.additionalActionsTimeout);
    clearTimeout(this.characterAnimTimeout);
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
    const animation = this.scene.characterModel.animations.find(anim => anim.name === this.characterAnimationSettings.name);
    if (!animation) return;
    this.scene.characterAnimMixer.stopAllAction();
    const action = this.scene.characterAnimMixer.clipAction(animation);
    action.setLoop(THREE.LoopRepeat, Infinity);
    action.setEffectiveTimeScale(this.characterAnimationSettings.speed || 1);
    action.play();
  }

  private updateCharacterAnimation(): void {
    if (!this.characterAnimationSettings.name) return;
    this.scene.characterAnimMixer.update(this.utils.getDeltaTime());
  }

  private characterFadeIn(): void {
    const opacity = (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity;
    (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity = Math.min(1, opacity * (1 + this.fadeFactor));
  }

  private characterFadeOut(): void {
    const opacity = (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity;
    (this.scene.characterMesh.material as THREE.MeshToonMaterial).opacity = Math.max(0, opacity * (1 - this.fadeFactor));
  }

  private easeInOutCubic(t: number): number {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  public switchCameraOrientation(): void {
    this.factor = 1;
    this.scene.trackMarker(this.name);
    this.setCameraPosition();
    this.setCameraTarget();
  }

  protected additionalActions(): void {}

  protected additionalActionsCleanup(): void {}
}