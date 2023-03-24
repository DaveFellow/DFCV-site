import { Scene } from "../../components/bg/Scene";
import { AbstractState } from "./AbstractState";
import * as THREE from 'three';

export class HomeState extends AbstractState {
  currentStep: number = 0;
  posDestination = new THREE.Vector3(-9.5, 18.911, 17.979);
  rotDestination!: THREE.Euler;

  constructor(scene: Scene) {
    super(scene);
    this.name = 'home';
  }

  public override onEnter(): void { 
    this.scene.setCamPosition(this.posDestination);
    this.rotDestination = this.scene.trackMarker(0);
    this.scene.setCamRotation(this.rotDestination);
    this.scene.render();
  }

  public override onAnimation(): void {
    // console.log("Home State Animating...");
  }

  public override onExit(): void {
    // console.log("Home State Exitted");
  }
}