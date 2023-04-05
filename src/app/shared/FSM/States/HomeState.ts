import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HomeState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/';
    super.destCamPosition = new THREE.Vector3(3.12676, 3.62141, -1.98985);
    super.targetIndex = 0;
  }
}