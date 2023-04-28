import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';
import { SummaryState } from "./SummaryState";

export class SummaryStateAlt extends SummaryState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/about-me';
  }
}