import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostBinding, Input, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'link-button',
    templateUrl: './link-button.component.html',
    styleUrls: ['./link-button.component.scss'],
    imports: [
      CommonModule,
      RouterModule
    ],
    standalone: true
})
export class LinkButtonComponent implements OnInit {
  @Input('active') isActive: boolean = false;
  @Input() route: string | null = null;
  
  @HostBinding('attr.tabindex') hostTabindex: string = '-1';
  
  public role = signal('');
  public ariaLabel = signal('');
  
  @ViewChild('label') labelElem!: ElementRef<HTMLSpanElement>;

  constructor (public router: Router) {}

  ngOnInit(): void {
    this.role.set(this.route ? 'link' : 'button');
  }
  
  ngAfterViewInit(): void {
    this.ariaLabel.set(this.labelElem.nativeElement.textContent.trim() || '');
  }
}
