import { State } from "./States/State";

export interface StatesMachine {
  currentState: State | null;
  animate: () => void;
  setState: (name: string) => void;
  clearState: () => void;
}