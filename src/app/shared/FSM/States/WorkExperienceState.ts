import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class WorkExperienceState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    this.name = '/work-experience';
    this.destCamPosition = new THREE.Vector3(-5.8, 4.7, -3.7);
    this.targetIndex = 3;
  }
}