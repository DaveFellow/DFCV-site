import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger } from "@angular/animations";
import { defaultRouteTransition, slideAnimIn, slideAnimOutLeft, slideAnimOutRight, slideStyleBase, slideStyleLeft, slideStyleRight } from "src/app/shared/animations/generic.anim";

const innerPageAnim = [ style({overflow: 'hidden'}), animateChild() ];

export const animations = trigger('routeAnimations', [
  transition('* => skillset', [
    group([
      query('#development-link', [ slideStyleLeft, slideAnimIn ]),
      query('#design-link', [ slideStyleRight, slideAnimIn ])
    ])
  ]),
  transition('* => development', [
    group([
      query('#content @enter', innerPageAnim),
      query('#back-btn', [ slideStyleLeft, slideAnimIn ]),
      query('#development-link', [ slideStyleRight, slideAnimIn ])
    ])
  ]),
  transition('* => design', [
    group([
      query('#content @enter', innerPageAnim),
      query('#back-btn', [ slideStyleLeft, slideAnimIn ]),
      query('#design-link', [ slideStyleRight, slideAnimIn ])
    ])
  ]),
  // transition('skillset => *', [
  //   animateChild(),
  //   query('#content', [
  //   ])
  // ]),
]);











































// style({
//   gridTemplateRows: '0 repeat(2, 1fr)',
//   gridTemplateColumns: '1fr 0'
// }),
// animate(500, style({
//   gridTemplateRows: 'max-content 1fr',
//   gridTemplateColumns: '7rem repeat(2, 1fr)'
// }))