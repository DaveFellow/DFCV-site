import { Component, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'arrow-button',
    template: `<button tabindex="0" [ngStyle]="{ width: size, height: size }"></button>`,
    styles: [`
    button {
      position: relative;
      display: block;
      width: 7rem;
      height: 7rem;
    
      background: url('/assets/img/back_arrow.svg') no-repeat;
      background-size: contain;
      background-position: center;

      border: 0;
    }
  `],
    standalone: false
})
export class ArrowButtonComponent {
  @Input() size: string = '7rem';
  @HostBinding('attr.aria-role') hostAriaRole = 'button';
  @HostBinding('attr.tabindex') hostTabindex = -1;
}
