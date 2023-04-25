import { animate, group, keyframes, query, style, transition, trigger } from "@angular/animations";
import { transitionStyle } from "src/app/shared/animations/generic.anim";
import { slideAnimIn, slideAnimOutLeft, slideAnimOutRight, slideStyleBase, slideStyleLeft, slideStyleRight } from "src/app/shared/animations/slide.anim";

const summaryStyle = style({ right: 'calc(50% - 5rem)', width: '50%' });
const historyStyle = style({ right: '5rem', width: '70%' });
const toHistoryAnim = animate('500ms ease-out', historyStyle);
const toSummaryAnim = animate('500ms ease-out', summaryStyle);

export const routeAnimations = trigger('routeAnimations', [
  transition('void => about-me, void => summary', [
    transitionStyle,
    group([
      query('#main-info', [ summaryStyle, slideStyleLeft ]),
      query('#presentation-card', slideStyleRight),
    ]),
    group([ query('section', slideAnimIn) ])
  ]),
  transition('void => history', [
    group([
      query('#main-info', [ historyStyle, slideStyleRight]),
      query('#presentation-card', slideStyleLeft),
    ]),
    group([ query('section', slideAnimIn) ])
  ]),
  transition('about-me => void, summary => void', [
    query('section', slideStyleBase),
    group([
      query('#main-info', slideAnimOutLeft),
      query('#presentation-card', slideAnimOutRight),
    ])
  ]),
  transition('history => void', [
    query('section', slideStyleBase),
    group([
      query('#main-info', slideAnimOutRight),
      query('#presentation-card', slideAnimOutLeft),
    ])
  ]),
  transition('about-me => history, summary => history', group([
    query('#presentation-card', [ style({ right: '5rem' }) ]),
    query('#main-info', [ summaryStyle, toHistoryAnim ]),
    query('#presentation-card', animate(700, keyframes([
      slideStyleBase,
      slideStyleRight,
      style({ right: 'auto' }),
      slideStyleLeft,
      slideStyleBase
    ]))),
  ])),
  transition('history => summary', group([
    query('#presentation-card', [ style({ right: 'auto' }) ]),
    query('#main-info', [ historyStyle, toSummaryAnim ]),
    query('#presentation-card', animate(700, keyframes([
      slideStyleBase,
      slideStyleLeft,
      style({ right: '5rem' }),
      slideStyleRight,
      slideStyleBase
    ]))),
  ])),
]);