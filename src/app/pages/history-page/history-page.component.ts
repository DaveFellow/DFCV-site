import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { TabbedContainerComponent } from 'src/app/shared/components/tabbed-container/tabbed-container.component';
import { Tab } from 'src/app/shared/models/Tab';
import { tabs } from 'src/app/shared/objects/AboutMePage';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements AfterViewInit {
  @ViewChild('wrapper') wrapper!: ElementRef;
  public wrapperHeight: number = 0;

  @ViewChildren('timelineButtonInner')
  private timelineButtonInner!: QueryList<ElementRef>;

  @ViewChild(TabbedContainerComponent)
  private content!: TabbedContainerComponent;

  public currentBookmark: number = 0;
  public contentHeight: number = 0;

  resizeEvent!: Event;

  readonly timelineItems = [
    { text: ['', 'Education'], offsetTop: 0, lineHeight: 0 },
    { text: ['2012', 'Freelance Designer'], offsetTop: 0, lineHeight: 0 },
    { text: ['2017', 'Freelance Developer'], offsetTop: 0, lineHeight: 0 },
    { text: ['2020', '4id'], offsetTop: 0, lineHeight: 0 },
    { text: ['2022', 'Publicis Sapient'], offsetTop: 0, lineHeight: 0, lineTop: 0 },
  ];

  @ViewChildren('bookmark') bookmarks!: QueryList<ElementRef<HTMLDivElement>>;

  public tabs: Tab[] = tabs;

  ngAfterViewInit(): void {       
    this.wrapperHeight = this.wrapper.nativeElement.clientHeight;
    this.contentHeight = this.content.content.nativeElement.scrollHeight;

    this.setTimelineItemsData();
    this.addScrollEvent();

  }

  public goToBookmark(index: number): void {
    const element = this.bookmarks.get(index);
    if (!element) return;
    element.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => this.currentBookmark = index, 100);
  }

  @HostListener('window:resize')
  private setTimelineItemsData(): void {    
    this.content.children.forEach((child: HTMLElement, index: number) => {
      if (!index) return;
      const prevItem = this.timelineItems[index - 1];
      const currentItem = this.timelineItems[index];

      const basis = child.offsetTop / this.contentHeight;
      currentItem.offsetTop = this.wrapperHeight * basis;

      const prevHeight = this.timelineButtonInner.get(index - 1)?.nativeElement.clientHeight;
      currentItem.lineHeight = currentItem.offsetTop - prevItem.offsetTop - prevHeight - 50;
    });
  }

  private addScrollEvent(): void {
    const contentElement = this.content.content.nativeElement;
    
    contentElement.addEventListener('scroll', (e: Event) => {
      const target = e.target as HTMLDivElement;
      let bookmarkActivated = false;

      this.bookmarks.forEach((bookmark: ElementRef, index: number) => {
        if (bookmarkActivated) return;
        
        const paddingTop = this.content.contentInner.offsetTop;
        const bookmarkTop = bookmark.nativeElement.offsetTop;
        const offsetTop = paddingTop + bookmarkTop;

        if (target.scrollTop >= offsetTop) return;
        this.currentBookmark = index;
        bookmarkActivated = true;
      });
    });
  }
}
