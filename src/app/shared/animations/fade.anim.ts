import { animate, animation, style } from "@angular/animations";

export const fadeStyleIn = style({ opacity: 1 });
export const fadeStyleOut = style({ opacity: 0 });
export const fadeAnimIn = animate('500ms ease-out', fadeStyleIn);
export const fadeAnimOut = animate('500ms ease-out', fadeStyleOut);
export const fadeAnimInCustom = animation(animate('{{ timing }}', fadeStyleIn));
export const fadeAnimOutCustom = animation(animate('{{ timing }}', fadeStyleOut));