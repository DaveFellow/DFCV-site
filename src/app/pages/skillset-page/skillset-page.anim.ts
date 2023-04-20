import { animate, animateChild, query, style, transition, trigger } from "@angular/animations";
import { defaultRouteTransition, slideAnimIn, slideAnimOutLeft, slideAnimOutRight, slideStyleBase, slideStyleLeft, slideStyleRight } from "src/app/shared/animations/generic.anim";

export const routeAnim = trigger('routeAnimations', [defaultRouteTransition]);

export const devLinkAnim = trigger('devLinkAnim', [
  transition('* => skillset', [
    slideStyleLeft,
    slideAnimIn
  ]),
  transition('* => development', [
    slideStyleRight,
    slideAnimIn
  ])
]);

export const designLinkAnim = trigger('designLinkAnim', [
  transition('* => skillset', [
    slideStyleRight,
    slideAnimIn
  ]),
  transition('* => design', [
    slideStyleRight,
    slideAnimIn
  ])
]);

export const backBtnAnim = trigger('backBtnAnim', [
  transition(':enter', [ slideStyleLeft, slideAnimIn ]),
  // transition(':leave', [ slideStyleBase, slideAnimOutRight ])
]);