import { animate, animateChild, query, style, transition } from "@angular/animations";

export const slideStyleBase = style({ opacity: 1, transform: 'translateX(0)' });
export const slideStyleLeft = style({ opacity: 0, transform: 'translateX(-20rem)' });
export const slideStyleRight = style({ opacity: 0, transform: 'translateX(20rem)' });
export const slideAnimIn = animate('500ms ease-out', slideStyleBase);
export const slideAnimOutLeft = animate('500ms ease-in', slideStyleLeft);
export const slideAnimOutRight = animate('500ms ease-in', slideStyleRight);

export const defaultRouteTransition = transition('* => *', [
  query(':leave, :leave @routeAnimations', animateChild(), { optional: true }),
]);
