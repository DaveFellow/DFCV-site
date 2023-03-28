import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SummaryState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = 'summary';
    super.destCamPosition = new THREE.Vector3(14, 17.979, 18.911);
    super.targetIndex = 4;
  }
}