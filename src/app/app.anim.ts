import { animateChild, query, transition, trigger } from "@angular/animations";

export const routeAnimations = trigger('routeAnimations', [
  // transition('* => *', [
  //   query(':enter, :enter @routeAnimations', animateChild(), { optional: true }),
  //   query(':leave, :leave @routeAnimations', animateChild(), { optional: true }),
  // ])
]);