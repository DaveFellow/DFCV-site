import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HistoryState extends BGTransitionState {
  constructor(scene: Scene) {
    const characterAnimationSettings = { name: 'anim_5', speed: 0.5 };
    super(scene, '/about-me/history', characterAnimationSettings);
  }
}