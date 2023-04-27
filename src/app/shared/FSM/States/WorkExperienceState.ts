import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class WorkExperienceState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/work-experience';
    super.destCamPosition = new THREE.Vector3(-5.8, 4.7, -3.7);
    super.targetIndex = 3;
  }
}