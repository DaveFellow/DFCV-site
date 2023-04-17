import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';
import { HomeState } from "./HomeState";

export class HomeStateAlt extends BGTransitionState {
  constructor(scene: Scene) {
    const baseState: HomeState = new HomeState(scene);
    super(scene);
    super.name = '/';
    super.destCamPosition = baseState.getDestCamPosition;
    super.targetIndex = baseState.getTargetIndex;
  }
}