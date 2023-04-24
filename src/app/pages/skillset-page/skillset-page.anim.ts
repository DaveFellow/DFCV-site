import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger } from "@angular/animations";
import { defaultRouteTransition, slideAnimIn, slideAnimOutLeft, slideAnimOutRight, slideStyleBase, slideStyleLeft, slideStyleRight } from "src/app/shared/animations/generic.anim";

const innerPageAnim = [ style({overflow: 'hidden'}), animateChild() ];

const skillsetLinksAnim = group([
  query('#development-link', [ slideStyleLeft, slideAnimIn ]),
  query('#design-link', [ slideStyleRight, slideAnimIn ])
])

export const animations = trigger('routeAnimations', [
  transition('void => skillset', skillsetLinksAnim),
  transition(':leave', [
    group([
      query('#development-link', [ slideStyleBase, slideAnimOutLeft ]),
      query('#design-link', [ slideStyleBase, slideAnimOutRight ]),
    ])
  ]),
  transition('skillset => development, skillset => design', [
    group([
      query('#development-link', [ slideStyleBase, slideAnimOutLeft ]),
      query('#design-link', [ slideStyleBase, slideAnimOutRight ]),
    ]),
    group([
      query(':enter @header', animateChild()),
      query(':enter @skillsetGridAnim', animateChild()),
    ])
  ]),
  transition('development => *, design => *', [
    query('#development-link', slideStyleLeft),
    query('#design-link', slideStyleRight),
    group([
      query(':leave @header', animateChild()),
      query(':leave @skillsetGridAnim', animateChild()),
    ]),
    skillsetLinksAnim
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