import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SkillsetState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/skillset';
    super.destCamPosition = new THREE.Vector3(0, 12, -11);
    super.targetIndex = 6;
  }
}