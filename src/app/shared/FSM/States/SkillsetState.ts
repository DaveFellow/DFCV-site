import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SkillsetState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/skillset';
    super.destCamPosition = new THREE.Vector3(-9.57811, 14.9787, -18.9113);
    super.targetIndex = 5;
  }
}