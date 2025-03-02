import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SummaryState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    this.name = '/about-me/summary';
    this.destCamPosition = new THREE.Vector3(-0.39498, 4.59093, -8.12091);
    this.targetIndex = 1;
  }
}