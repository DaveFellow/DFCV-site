import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Tab } from '../../models/Tab';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tabbed-container',
    templateUrl: './tabbed-container.component.html',
    styleUrls: ['./tabbed-container.component.scss'],
    imports: [
      CommonModule,
      RouterModule
    ],
    standalone: true
})
/**
 * This is a fake tabs container, it's made only for aesthetic purpose.
 * The content provided is only one and won't change depending on active tab.
 */
export class TabbedContainerComponent implements AfterViewInit {
  @Input()
  public tabs: Tab[] = [];

  @Input()
  public activeTab: string = '';

  @ViewChild('content')
  public content!: ElementRef;

  public get contentInner(): HTMLDivElement {
    return this.content.nativeElement.firstChild;
  };

  public get children(): HTMLElement[] {
    return Array.from(this.content.nativeElement.firstChild.children);
  };

  ngAfterViewInit(): void {
  }
}
