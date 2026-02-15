import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SummaryState extends BGTransitionState {
  private cup?: THREE.Object3D;
  private cupOgPosition?: THREE.Vector3;
  private cupOgRotation?: THREE.Euler;
  private cupOgScale?: THREE.Vector3;
  private cupOgParent?: THREE.Object3D;
  private rightHand?: THREE.Bone;

  constructor(scene: Scene, name: string = '/about-me/summary') {
    const characterAnimationSettings = { name: 'anim_4' };
    super(scene, name, characterAnimationSettings);
  }

  protected override additionalActions(): void {
    this.cup = this.scene.scene.getObjectByName('Coffee_cup001');
    this.rightHand = (this.scene.characterMesh as THREE.SkinnedMesh).skeleton.bones.find(elem => elem.name === 'handr');

    if (!this.cup || !this.rightHand) return;

    this.cupOgPosition = this.cup?.position.clone();
    this.cupOgRotation = this.cup?.rotation.clone();
    this.cupOgScale = this.cup?.scale.clone();
    this.cupOgParent = this.cup?.parent!;

    this.rightHand.attach(this.cup);
    this.cup?.position.set(-0.05, 0.7, -0.25);
    this.cup?.rotation.set(0.8, 0, 1.5);
  }

  protected override additionalActionsCleanup(): void {
    this.cupOgParent?.attach(this.cup!);
    this.cup?.position.copy(this.cupOgPosition!);
    this.cup?.rotation.copy(this.cupOgRotation!);
    this.cup?.scale.copy(this.cupOgScale!);
  }
}