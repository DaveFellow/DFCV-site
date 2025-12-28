import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class HistoryState extends BGTransitionState {
  constructor(scene: Scene) {
    super(scene, '/about-me/history');
  }
}