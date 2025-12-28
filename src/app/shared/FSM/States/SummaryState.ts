import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';

export class SummaryState extends BGTransitionState {
  constructor(scene: Scene, name: string = '/about-me/summary') {
    super(scene, name);
  }
}