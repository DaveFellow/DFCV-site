import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class WorkExperienceState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene, '/work-experience');
  }
}