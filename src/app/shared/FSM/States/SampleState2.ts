import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SampleState2 extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/work-experience';
    super.destCamPosition = new THREE.Vector3(-7.7157, 6.5708, 0.143393);
    super.targetIndex = 3;
  }
}