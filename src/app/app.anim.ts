import { trigger } from "@angular/animations";
import { defaultRouteTransition } from "./shared/animations/generic.anim";

export const routeAnimations = trigger('routeAnimations', [ defaultRouteTransition ]);