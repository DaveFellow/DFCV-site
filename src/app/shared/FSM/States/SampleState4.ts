import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SampleState4 extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene, 'sample4');
  }
}