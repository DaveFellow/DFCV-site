import { animate, query, stagger, state, style, transition, trigger } from "@angular/animations";

const wrapperInitStyles = style({ position: 'absolute', width: `calc(${getWrapperInitStylesWidth()})` });

const cardOutStyles = style({ opacity: 0, transform: 'translate(5rem, -5rem)', backdropFilter: 'var(--bg-blur)' });
const cardInStyles = style({ opacity: 1, transform: 'translate(0, 0)', backdropFilter: 'var(--bg-blur)' });

export const skillsetGridAnim = trigger('skillsetGridAnim', [
  transition(':enter', [
    wrapperInitStyles,
    query('skill-card', [
      cardOutStyles,
      stagger('50ms', animate('500ms ease-out', cardInStyles))
    ], { optional: true }
    ),
  ]),
  transition(':leave', [
    wrapperInitStyles,
    query('skill-card', [
      cardInStyles,
      stagger('50ms', animate('500ms ease-in', cardOutStyles)),
    ], { optional: true }
    ),
  ])
]);

function getWrapperInitStylesWidth() {
  const resBetweenFn = (min: number, max: number) => window.innerWidth > min && window.innerWidth <= max;

  if (resBetweenFn(0, 900)) {
    return '100%';
  }

  if (resBetweenFn(900, 1400)) {
    return '50% - 2rem';
  }

  return '50% - 5rem';
}