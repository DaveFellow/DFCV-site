import { group, query, stagger, style, transition, trigger, useAnimation } from "@angular/animations";
import { fadeAnimIn, fadeAnimOut, fadeStyleOut } from "src/app/shared/animations/fade.anim";
import { slideAnimIn, slideAnimOutLeft, slideAnimOutLeftCustom, slideAnimOutRight, slideStyleRight } from "src/app/shared/animations/slide.anim";

export const routeAnimations = trigger('routeAnimations', [
 transition(':enter', [
  query('.work-exp', slideStyleRight),
  query('#background', [ fadeStyleOut, fadeAnimIn ]),
  query('li', slideStyleRight),
  group([
    query('.work-exp__roles-resp', style({ overflow: 'hidden' })),
    query('.work-exp', stagger(100, slideAnimIn)),
    query('li', stagger(100, slideAnimIn))
  ])
 ]),
 transition(':leave', [
  group([
    query('#background', [ fadeAnimOut ]),
    query('.work-exp', useAnimation(slideAnimOutLeftCustom, {
      params: { timing: '300ms' }
    }))
  ])
 ])
])