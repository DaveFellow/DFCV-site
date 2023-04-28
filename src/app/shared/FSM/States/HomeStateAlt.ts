import { Scene } from "../../components/bg/Scene";
import { BGTransitionState } from "./BGTransitionState";
import * as THREE from 'three';
import { HomeState } from "./HomeState";

export class HomeStateAlt extends HomeState {
  constructor(scene: Scene) {
    super(scene);
    super.name = '/';
  }
}