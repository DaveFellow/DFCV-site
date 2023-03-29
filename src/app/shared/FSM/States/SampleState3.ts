import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SampleState3 extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = 'sample3';
    super.destCamPosition = new THREE.Vector3(-7.7157, 6.5708, 0.143393);
    super.targetIndex = 4;
  }
}