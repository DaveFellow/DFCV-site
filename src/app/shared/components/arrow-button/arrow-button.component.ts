import { Component, HostBinding, HostListener, Input, OnInit, signal } from '@angular/core';

@Component({
    selector: 'arrow-button',
    template: `<button tabindex="0" [ngStyle]="{ width: _size(), height: _size() }"></button>`,
    styles: [`
    button {
      position: relative;
      display: block;
      width: 7rem;
      height: 7rem;
      transform: translateX(1rem);
    
      background: url('/assets/img/back_arrow.svg') no-repeat;
      background-size: contain;
      background-position: center;

      border: 0;

      cursor: pointer;

      &:hover {
        animation: bounce 2s ease-in-out infinite;
      }
    }

    @keyframes bounce {
      0%, 100% {
        transform: translateX(1rem);
      }
      50% {
        transform: translateX(0);
      }
    }
  `],
    standalone: false
})
export class ArrowButtonComponent implements OnInit {
  _size = signal('7rem');
  @Input() size: string | {
    [key: string]: string;
  } = '7rem';
  @HostBinding('attr.aria-role') hostAriaRole = 'button';
  @HostBinding('attr.tabindex') hostTabindex = -1;

  ngOnInit() {
    this.onResize();
  }

  @HostListener('window:resize')
  onResize() {
    if (typeof this.size === 'string') {
      this._size.set(this.size);
      return;
    }

    const widthKeys = Object.keys(this.size)
      .map(key => parseInt(key))
      .sort((a, b) => a - b);

    let i = 0;
    for (const widthKey of widthKeys) {
      const prevValue = widthKeys[i - 1] || 0;

      if (window.innerWidth < widthKey + 1 && window.innerWidth >= prevValue) {
        this._size.set(this.size[widthKey]);
        return;
      }
      i++;
    }
  }
}
