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

  readonly pageContent = [
    {
      title: 'Education',
      paragraphs: ['Graduated in 2013 with a bachelor’s degree on Graphic Design in the Rafael Belloso Chacin University (URBE) in Zulia, Venezuela.'],
      sidenote: 'His final project for the bachelor’s degree was a 3D educational application in Unity (programming included), for which the focus of the thesis was graphics for interactable experiences.',
    },
    {
      title: '2012 - Freelance Designer',
      paragraphs: [
        'Since 2012 he spent several years working as a freelancer graphic designer on fields like illustration, advertising, branding, photography and, of course, UX/UI.',
        'As he was already doing web development for hobby as a teenager, he also later worked on web design and development projects that mostly included static website, UI re-design/implementation and WordPress websites. Some projects involved the use of Unity for several task, some related to programming.'
      ],
    },
    {
      title: '2017 - Freelance Developer',
      paragraphs: [
        'In 2017 David decided to dive deeper into software development since he always enjoyed programming more than anything else in his projects, so he immersed himself into a learning process of all modern web development techniques by updating his current skills and learning new ones like Angular and TypeScript, which nowadays take part of his strength.',
        'The most important project developed during this period was the design, development and direction of the checkout interface and mobile app for a reputable bus ticket business in Chile.'
      ],
    },
    {
      title: '2020 - 4id',
      paragraphs: [
        'In 2020 he got hired by a Chilean company as a Full-stack web developer, in which he worked on featured and maintenance for an important local conference streaming platform and other clients and some external client’s projects.',
        'His most important achievement within the company was the design and development of a very important management system for the company which took around 7 months since the beginning of the project until completion. The system was so successful that made a 180° turnaround on the company pipeline as it basically took care of many things that were taken care manually before by several people, significantly reducing the amount of necessary personnel and attention for general business process.',
        'Other achievements within that company involved the design and developments of several UX/UI improvements for the main service system as well as international support for a client business that only operated within the country.'
      ],
    },
    {
      title: '2022 - Publicis Sapient',
      paragraphs: [
        'In 2022 David got hired by Publicis Sapient, where he currently works and is ready for the next challenge.',
      ],
    }
  ]

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
