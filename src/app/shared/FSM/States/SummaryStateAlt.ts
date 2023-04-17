import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';
import { SummaryState } from "./SummaryState";

export class SummaryStateAlt extends BGTransitionState {
  constructor(scene: Scene) {
    const baseState: SummaryState = new SummaryState(scene);
    super(scene);
    super.name = '/about-me';
    super.destCamPosition = baseState.getDestCamPosition;
    super.targetIndex = baseState.getTargetIndex;
  }
}