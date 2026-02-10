import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SoftwareDevelopmentState extends BGTransitionState {
  constructor(scene: Scene) {
    const characterAnimationSettings = { name: 'anim_2' };
    super(scene, '/skillset/software-development', characterAnimationSettings);
  }
}