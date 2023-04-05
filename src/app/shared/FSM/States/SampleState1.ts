import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SampleState1 extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/skillset';
    super.destCamPosition = new THREE.Vector3(-7.5844, 6.98064, 1.79739);
    super.targetIndex = 2;
  }
}