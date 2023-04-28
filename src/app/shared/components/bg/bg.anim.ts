import { animate, query, style, transition, trigger } from "@angular/animations";
import { slideAnimIn, slideAnimOutLeft, slideAnimOutRight, slideStyleBase, slideStyleLeft, slideStyleRight } from "../../animations/slide.anim";

const rightBaseStyle = style({ transform: 'translate(0, -50%) rotate(180deg)', opacity: 1 });
const rightOutStyle = style({ transform: 'translate(-20rem, -50%) rotate(180deg)', opacity: 0 });

export const bgDomAnimations = trigger('bgDomAnimations', [
  transition('* => left', query('arrow-button.left', [slideStyleRight, slideAnimIn], { optional: true })),
  transition('left => *', query('arrow-button.left', [slideStyleBase, slideAnimOutRight], { optional: true })),
  transition('* => right', query('arrow-button.right', [slideStyleRight, slideAnimIn], { optional: true })),
  transition('right => *', query('arrow-button.right', [slideStyleBase, slideAnimOutRight], { optional: true }))
]);