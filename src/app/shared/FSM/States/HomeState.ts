import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HomeState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/home';
    super.destCamPosition = new THREE.Vector3(0, 4, 0);
    super.targetIndex = 0;
  }

  public override onEnter(): void {
    super.onEnter();
    this.scene.canControl = true;
  }
}