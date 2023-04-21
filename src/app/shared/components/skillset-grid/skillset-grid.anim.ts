import { animate, query, stagger, style, transition, trigger } from "@angular/animations";

export const skillsetGridAnim = trigger('skillsetGridAnim', [
  transition(':enter', [
    style({ position: 'absolute', width: 'calc(100% - 10rem)' }),
    query('skill-card', [
      style({
        opacity: 0,
        transform: 'translate(5rem, -5rem)',
        backdropFilter: 'var(--bg-blur)'
      }),
      stagger('50ms', [
        animate('500ms ease-out', style({
          opacity: 1,
          transform: 'translate(0, 0)'
        }))
      ])
    ], {
      optional: true
    }),
    style({ position: 'relative', width: 'auto' }),
  ]),
  // Not working, most probably needs the router anim to anim before moving
  transition(':leave', [
    query('skill-card', [
      style({ opacity: 1, transform: 'translate(0, 0)', backdropFilter: 'var(--bg-blur)' }),
      stagger('50ms', [
        animate(
          '500ms ease-out',
          style({ opacity: 0, transform: 'translate(5rem, -5rem)', backdropFilter: 'var(--bg-blur)' }),
        ),
      ])
    ], {
      optional: true
    })
  ]),
]);