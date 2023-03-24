import { Scene } from "../../components/bg/Scene";
import { State } from "./State";

export abstract class AbstractState implements State {
  name: string = 'unnamed';

  protected scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }
  
  public onEnter(): void {}
  public onAnimation(): void {}
  public onExit(): void {}
}