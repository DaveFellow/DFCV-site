import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SkillsetState extends BGTransitionState {
  private rightHand?: THREE.Bone;
  private mouse?: THREE.Object3D;
  private mouseOgPosition?: THREE.Vector3;
  private mouseOgRotation?: THREE.Euler;
  private mouseOgParent?: THREE.Object3D;

  constructor(scene: Scene) {
    super(scene, '/skillset', 'anim_1', 0.5);
  }

  protected override additionalActions(): void {
    this.mouse = this.scene.scene.getObjectByName('Mouse');
    this.mouseOgPosition = this.mouse!.position.clone();
    this.mouseOgRotation = this.mouse!.rotation.clone();
    this.mouseOgParent = this.mouse!.parent!;

    this.rightHand = (this.scene.characterMesh as THREE.SkinnedMesh).skeleton.bones.find(elem => elem.name === 'handr');

    if (!this.mouse || !this.rightHand) return;

    this.rightHand.attach(this.mouse);
    this.mouse.position.set(-0.05, 0.55, -0.2);
    this.mouse.rotation.set(90, 0.1, 0);
  }

  protected override additionalActionsCleanup(): void {
    this.mouseOgParent?.attach(this.mouse!)
    this.mouse?.position.copy(this.mouseOgPosition!);
    this.mouse?.rotation.copy(this.mouseOgRotation!);
  }
}