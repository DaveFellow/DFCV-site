import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, effect, HostBinding, HostListener, Input, OnInit, signal } from '@angular/core';
import { ScreenResolutionService } from '../../services/screen-resolution.service';

@Component({
    selector: 'arrow-button',
    template: `
      <button tabindex="0" [ngStyle]="{ width: _size(), height: _size() }">
        <img src="assets/img/back_arrow.svg" alt="Back icon">
      </button>`,
    styles: [`
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      background: none;
      margin-top: .3rem;

      position: relative;
      display: block;
      width: 7rem;
      height: 7rem;
      translate: 1rem .2rem;
    
      border: 0;

      cursor: pointer;

      &:hover {
        animation: bounce 2s ease-in-out infinite;
      }

      img {
        width: 100%;
      }
    }

    @keyframes bounce {
      0%, 100% {
        translate: 1rem .2rem;
      }
      50% {
        translate: 0 .2rem;
      }
    }
  `],
    standalone: true,
    imports: [CommonModule]
})
export class ArrowButtonComponent implements AfterViewInit {
  _size = signal('7rem');
  @Input() size: string | {
    [key: string]: string;
  } = '7rem';
  @HostBinding('attr.aria-role') hostAriaRole = 'button';
  @HostBinding('attr.tabindex') hostTabindex = -1;

  constructor(private screenResolutionService: ScreenResolutionService) {
    effect(() => this.onResize(this.screenResolutionService.currentResolution()));
  }

  ngAfterViewInit() {
    this.onResize({
      x: window.innerWidth,
      y: window.innerHeight
    });
  }

  onResize(resolution: {
    x: number,
    y: number
  }) {
    if (typeof this.size === 'string') {
      this._size.set(this.size);
      return;
    }

    const widthKeys = Object.keys(this.size)
      .map(key => key === 'default' ? Infinity : parseInt(key))
      .sort((a, b) => a - b);

    let i = 0;
    for (const widthKey of widthKeys) {
      const prevValue = widthKeys[i - 1] || 0;

      if (resolution.x < widthKey + 1 && resolution.x >= prevValue) {
        this._size.set(this.size[widthKey === Infinity ? 'default' : widthKey]);
        return;
      }
      i++;
    }
  }
}
