import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HistoryState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    this.name = '/about-me/history';
    this.destCamPosition = new THREE.Vector3(-7.5844, 6.98064, 1.79739);
    this.targetIndex = 2;
  }
}