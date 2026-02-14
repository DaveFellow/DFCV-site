import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, signal, ViewChild } from '@angular/core';
import { WorkExperience } from 'src/app/shared/models/WorkExperience';
import { workExperienceData } from './work-experience-data';
import { routeAnimations } from './work-experience.anim';

@Component({
    selector: 'app-work-experience-page',
    templateUrl: './work-experience-page.component.html',
    styleUrls: ['./work-experience-page.component.scss'],
    animations: [routeAnimations],
    standalone: false
})
export class WorkExperiencePageComponent {
  @ViewChild('wrapper') wrapperElement!: ElementRef<HTMLDivElement>;
  @ViewChild('item') itemElement!: ElementRef<HTMLDivElement>;

  public get backgroundHeight() {
    return this.itemElement?.nativeElement.clientHeight + 100 || 0;
  }

  private isScrollingOnX: boolean = false;
  private currentDragSpeed: number = 0;
  readonly workExperience: WorkExperience[] = workExperienceData;

  @HostListener('mousemove', ['$event'])
  public scrollOnDrag(e: MouseEvent): void {
    if (!this.isScrollingOnX) return;
    this.currentDragSpeed = e.movementX * -1;
    this.wrapperElement.nativeElement.scrollBy(this.currentDragSpeed, 0);
  }

  @HostListener('mousedown')
  public initDrag(): void {
    this.isScrollingOnX = true;
  }

  @HostListener('window:mouseup')
  public endDrag(): void {
    this.isScrollingOnX = false;
  }

  @HostListener('wheel', ['$event'])
  scrollOnX(e: WheelEvent): void {
    e.preventDefault();
    this.wrapperElement.nativeElement.scrollBy({ left: e.deltaY })
  }
}

