import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SampleState4 extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = 'sample4';
    super.destCamPosition = new THREE.Vector3(-9.57811, 14.9787, -18.9113);
    super.targetIndex = 5;
  }
}