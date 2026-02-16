import { animate, group, keyframes, query, style, transition, trigger } from "@angular/animations";
import { transitionStyle } from "src/app/shared/animations/generic.anim";
import { slideAnimIn, slideAnimOutLeft, slideAnimOutRight, slideStyleBase, slideStyleLeft, slideStyleRight } from "src/app/shared/animations/slide.anim";

const summaryStyle = style({ right: 'calc(50% - 5rem)', width: '50%' });
const historyStyle = style({ right: '5rem', width: '70%' });
const toHistoryAnim = animate('500ms ease-out', historyStyle);
const toSummaryAnim = animate('500ms ease-out', summaryStyle);

const presentationCardSummaryInAnim = window.innerWidth > 900 ? slideStyleRight : slideStyleLeft;
const presentationCardSummaryOutAnim = window.innerWidth > 900 ? slideAnimOutRight : slideAnimOutLeft;
const presentationCardHistoryInAnim = window.innerWidth > 900 ? slideStyleLeft : slideStyleRight;
const presentationCardHistoryOutAnim = window.innerWidth > 900 ? slideAnimOutLeft : slideAnimOutRight;

const presentationCardHistoryRight = window.innerWidth > 900 ? 'auto' : '5rem';
const presentationCardSummaryRight = window.innerWidth > 900 ? '5rem' : 'auto';

const presentationCardSummaryToHistoryInAnim = window.innerWidth > 900 ? slideStyleLeft : slideStyleRight;
const presentationCardSummaryToHistoryOutAnim = window.innerWidth > 900 ? slideStyleRight : slideStyleLeft;
const presentationCardHistoryToSummaryInAnim = window.innerWidth > 900 ? slideStyleRight : slideStyleLeft;
const presentationCardHistoryToSummaryOutAnim = window.innerWidth > 900 ? slideStyleLeft : slideStyleRight;

export const routeAnimations = trigger('routeAnimations', [
  transition('void => about-me, void => summary', [
    transitionStyle,
    group([
      query('#main-info', [ summaryStyle, slideStyleLeft ]),
      query('#presentation-card', presentationCardSummaryInAnim),
    ]),
    group([ query('section', slideAnimIn) ])
  ]),
  transition('void => history', [
    group([
      query('#main-info', [ historyStyle, slideStyleRight]),
      query('#presentation-card', presentationCardHistoryInAnim),
    ]),
    group([ query('section', slideAnimIn) ])
  ]),
  transition('about-me => void, summary => void', [
    query('section', slideStyleBase),
    group([
      query('#main-info', slideAnimOutLeft),
      query('#presentation-card', presentationCardSummaryOutAnim),
    ])
  ]),
  transition('history => void', [
    query('section', slideStyleBase),
    group([
      query('#main-info', slideAnimOutRight),
      query('#presentation-card', presentationCardHistoryOutAnim),
    ])
  ]),
  transition('about-me => history, summary => history', group([
    query('#presentation-card', [ style({ right: presentationCardSummaryRight }) ]),
    query('#main-info', [ summaryStyle, toHistoryAnim ]),
    query('#presentation-card', animate(700, keyframes([
      slideStyleBase,
      presentationCardSummaryToHistoryOutAnim,
      style({ right: presentationCardHistoryRight }),
      presentationCardSummaryToHistoryInAnim,
      slideStyleBase
    ]))),
  ])),
  transition('history => summary', group([
    query('#presentation-card', [ style({ right: presentationCardHistoryRight, left: presentationCardSummaryRight }) ]),
    query('#main-info', [ historyStyle, toSummaryAnim ]),
    query('#presentation-card', animate(700, keyframes([
      slideStyleBase,
      presentationCardHistoryToSummaryOutAnim,
      style({ right: presentationCardSummaryRight }),
      presentationCardHistoryToSummaryInAnim,
      slideStyleBase
    ]))),
  ])),
]);