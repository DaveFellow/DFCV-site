import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HomeState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene);
    super.name = 'home';
    super.destCamPosition = new THREE.Vector3(-9.5, 18.911, 17.979);
    super.targetIndex = 2;
  }
}