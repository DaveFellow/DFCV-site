import { animate, animation, keyframes, style } from "@angular/animations";

export const slideStyleBase = style({ opacity: 1, transform: 'translateX(0)' });
export const slideStyleLeft = style({ opacity: 0, transform: 'translateX(-20rem)' });
export const slideStyleRight = style({ opacity: 0, transform: 'translateX(20rem)' });
export const slideStyleUp = style({ opacity: 0, transform: 'translateY(20rem)' });
export const slideStyleDown = style({ opacity: 0, transform: 'translateY(-20rem)' });

export const slideAnimIn = animate('500ms ease-out', slideStyleBase);
export const slideAnimOutLeft = animate('500ms ease-in', slideStyleLeft);
export const slideAnimOutRight = animate('500ms ease-in', slideStyleRight);
export const slideAnimOutUp = animate('500ms ease-in', slideStyleUp);
export const slideAnimOutDown = animate('500ms ease-in', slideStyleDown);

export const slideAnimInCustom = animation(animate('{{ timing }}', slideStyleBase));
export const slideAnimOutLeftCustom = animation(animate('{{ timing }}', slideStyleLeft));
export const slideAnimOutRightCustom = animation(animate('{{ timing }}', slideStyleRight));
export const slideAnimOutUpCustom = animation(animate('{{ timing }}', slideStyleUp));
export const slideAnimOutDownCustom = animation(animate('{{ timing }}', slideStyleDown));