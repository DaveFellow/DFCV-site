import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";

export class GraphicDesignState extends BGTransitionState {
  private rightHand?: THREE.Bone;

  private mouse?: THREE.Object3D;
  private mouseOgPosition?: THREE.Vector3;

  private keyboard?: THREE.Object3D;
  private keyboardOgPosition?: THREE.Vector3;

  private tablet?: THREE.Object3D;
  private tabletOgPosition?: THREE.Vector3;

  private pen?: THREE.Object3D;
  private penOgPosition?: THREE.Vector3;
  private penOgRotation?: THREE.Euler;
  private penOgParent?: THREE.Object3D;
  
  constructor(scene: Scene) {
    const characterAnimationSettings = { name: 'anim_3' };
    super(scene, '/skillset/graphic-design', characterAnimationSettings);
  }

  protected override additionalActions(): void {
    this.keyboard = this.scene.scene.getObjectByName('Keyboard');
    this.mouse = this.scene.scene.getObjectByName('Mouse');
    this.tablet = this.scene.scene.getObjectByName('Tablet');
    this.pen = this.scene.scene.getObjectByName('Tablet_Pen');
    this.rightHand = (this.scene.characterMesh as THREE.SkinnedMesh).skeleton.bones.find(elem => elem.name === 'handr');

    if (!this.keyboard || !this.mouse || !this.rightHand || !this.tablet || !this.pen) return;

    this.keyboardOgPosition = this.keyboard!.position.clone();
    this.mouseOgPosition = this.mouse!.position.clone();
    this.tabletOgPosition = this.tablet!.position.clone();
    this.penOgPosition = this.pen!.position.clone();
    this.penOgRotation = this.pen!.rotation.clone();
    this.penOgParent = this.pen!.parent!;

    this.keyboard.position.set(
      this.keyboardOgPosition!.x,
      this.keyboardOgPosition!.y,
      this.keyboardOgPosition!.z - 1
    );

    this.mouse.position.set(
      this.mouseOgPosition!.x,
      this.mouseOgPosition!.y,
      this.mouseOgPosition!.z - 1
    );

    this.tablet.position.set(
      this.tabletOgPosition!.x - 1.9,
      this.tabletOgPosition!.y,
      this.tabletOgPosition!.z + 1.4
    );

    this.rightHand.attach(this.pen);
    this.pen.position.set(-0.15, 0.6, -0.1);
    this.pen.rotation.set(0.8, 0, 0);
  }

  protected override additionalActionsCleanup(): void {
    this.keyboard?.position.copy(this.keyboardOgPosition!);
    this.mouse?.position.copy(this.mouseOgPosition!);
    this.tablet?.position.copy(this.tabletOgPosition!);
    this.penOgParent?.attach(this.pen!);
    this.pen?.position.copy(this.penOgPosition!);
    this.pen?.rotation.copy(this.penOgRotation!);
  }
}