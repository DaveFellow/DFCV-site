import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class WorkExperienceState extends BGTransitionState {
  constructor(scene: Scene) {
    const characterAnimationSettings = { name: 'anim_6', speed: 0.1 };
    super(scene, '/work-experience', characterAnimationSettings);
  }
}