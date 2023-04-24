import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger } from "@angular/animations";
import { defaultRouteTransition, slideAnimIn, slideAnimOutLeft, slideAnimOutRight, slideStyleBase, slideStyleLeft, slideStyleRight } from "src/app/shared/animations/generic.anim";

const linksAnimIn = group([
  query('#development-link', [ slideStyleLeft, slideAnimIn ]),
  query('#design-link', [ slideStyleRight, slideAnimIn ])
])

const linksAnimOut = group([
  query('#development-link', [ slideStyleBase, slideAnimOutLeft ], { optional: true }),
  query('#design-link', [ slideStyleBase, slideAnimOutRight ], { optional: true }),
]);

const childrenAnim = group([
  query(':enter @header, :leave @header, :enter @skillsetGridAnim, :leave @skillsetGridAnim', [
    animateChild()
  ],{ optional: true })
]);

export const animations = trigger('routeAnimations', [
  transition('void => skillset', linksAnimIn),
  transition(':leave', [linksAnimOut, childrenAnim]),
  transition('skillset => development, skillset => design', [linksAnimOut, childrenAnim]),
  transition('development => *, design => *', [
    query('#development-link', slideStyleLeft, { optional: true }),
    query('#design-link', slideStyleRight, { optional: true }),
    childrenAnim,
    linksAnimIn
  ])
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
      query('arrow-button', [ slideStyleBase, slideAnimOutLeft ])
    ])
  ])
]);