import { Scene } from "../../components/bg/Scene";
import { State } from "./State";

export abstract class AbstractState implements State {
  name: string = 'unnamed';

  protected scene: Scene;

  constructor(scene: Scene, name: string = 'unnamed') {
    this.scene = scene;
    this.name = name;
  }
  
  public onEnter(): void {}
  public onAnimation(): void {}
  public onExit(): void {}
}