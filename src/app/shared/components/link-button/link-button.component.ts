import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'link-button',
  templateUrl: './link-button.component.html',
  styleUrls: ['./link-button.component.scss'],
})
export class LinkButtonComponent implements OnInit {
  @Input('active') isActive: boolean = false;
  @Input() route: string | null = null;
  
  @HostBinding('attr.tabindex') hostTabindex: string = '-1';
  
  public role: string = '';
  public ariaLabel: string = '';
  
  @ViewChild('label') labelElem!: ElementRef<HTMLSpanElement>;

  constructor (public router: Router) {}

  ngOnInit(): void {
    this.role = this.route ? 'link' : 'button';
  }
  
  ngAfterViewInit(): void {
    this.ariaLabel = this.labelElem.nativeElement.textContent || '';
  }
}
