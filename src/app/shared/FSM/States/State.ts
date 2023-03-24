export interface State {
  name: string;
  onEnter: () => void;
  onAnimation: () => void;
  onExit: () => void;
}