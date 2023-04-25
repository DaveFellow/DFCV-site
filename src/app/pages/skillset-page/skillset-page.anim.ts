import { animateChild, group, query, transition, trigger } from "@angular/animations";
import { transitionStyle } from "src/app/shared/animations/generic.anim";
import { slideAnimIn, slideAnimOutLeft, slideAnimOutRight, slideStyleBase, slideStyleLeft, slideStyleRight } from "src/app/shared/animations/slide.anim";

const linksAnimIn = group([
  query('#development-link', [ slideStyleLeft, slideAnimIn ], { optional: true }),
  query('#design-link', [ slideStyleRight, slideAnimIn ], { optional: true })
])

const linksAnimOut = group([
  query('#development-link', [ slideStyleBase, slideAnimOutLeft ], { optional: true }),
  query('#design-link', [ slideStyleBase, slideAnimOutRight ], { optional: true }),
]);

const childrenAnim = group([
  query(`:enter @header,
    :leave @header,
    :enter @skillsetGridAnim,
    :leave @skillsetGridAnim`,
    animateChild(),
    { optional: true }
  )
]);

export const animations = trigger('routeAnimations', [
  transition(':leave, skillset => *', [transitionStyle, linksAnimOut, childrenAnim]),
  
  transition('* => skillset', [
    transitionStyle,
    query('#development-link', slideStyleLeft, { optional: true }),
    query('#design-link', slideStyleRight, { optional: true }),
    childrenAnim,
    linksAnimIn
  ]),
]);

export const subpageHeaderAnimation = trigger('header', [
  transition(':enter', [
    group([
      query('h2', [ slideStyleLeft, slideAnimIn ]),
      query('arrow-button', [ slideStyleLeft, slideAnimIn ])
    ])
  ]),
  transition(':leave', [
    group([
      query('h2', [ slideStyleBase, slideAnimOutLeft ]),
      query('arrow-button', [ slideStyleBase, slideAnimOutLeft ]),
      slideStyleLeft
    ])
  ])
]);