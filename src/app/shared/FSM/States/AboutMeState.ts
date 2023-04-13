import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class AboutMeState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/about-me';
    super.destCamPosition = new THREE.Vector3(-0.39498, 4.59093, -8.12091);
    super.targetIndex = 1;
  }
}