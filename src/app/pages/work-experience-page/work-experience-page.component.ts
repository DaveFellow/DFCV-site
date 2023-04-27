import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { WorkExperience } from 'src/app/shared/models/WorkExperience';
import { workExperienceData } from './work-experience-data';
import { ReplaySubject } from 'rxjs';
import { routeAnimations } from './work-experience.anim';

@Component({
  selector: 'app-work-experience-page',
  templateUrl: './work-experience-page.component.html',
  styleUrls: ['./work-experience-page.component.scss'],
  animations: [ routeAnimations ]
})
export class WorkExperiencePageComponent implements AfterViewInit {
  @ViewChild('wrapper') wrapperElement!: ElementRef<HTMLDivElement>;

  private isScrollingOnX: boolean = false;
  private currentDragSpeed: number = 0;
  private readonly decelerationThreshold = 2;


  readonly workExperience: WorkExperience[] = workExperienceData;

  ngAfterViewInit(): void {
  }

  @HostListener('mousemove', ['$event'])
  private scrollOnDrag(e: MouseEvent): void {
    if (!this.isScrollingOnX) return;
    this.currentDragSpeed = e.movementX * -1;
    this.wrapperElement.nativeElement.scrollBy(this.currentDragSpeed, 0);
  }

  @HostListener('mousedown', ['$event'])
  private initDrag(): void {
    this.isScrollingOnX = true;
  }

  @HostListener('window:mouseup', ['$event'])
  private endDrag(): void {
    // const lastDragSpeed = this.currentDragSpeed;
    
    // const stopped = (lastDragSpeed > 0 && this.currentDragSpeed <= this.decelerationThreshold)
    //   || (lastDragSpeed < 0 && this.currentDragSpeed >= -this.decelerationThreshold);
    // // console.log(movement, '<', movement < -threshold, '>', movement > threshold);
    
    // while (!stopped) {
    //   this.currentDragSpeed *= 0.99;
    //   console.log(this.currentDragSpeed);
    //   this.wrapperElement.nativeElement.scrollBy(this.currentDragSpeed, 0);
    // }

    this.isScrollingOnX = false;
  }

  @HostListener('wheel', ['$event'])
  scrollOnX(e: WheelEvent): void {
    e.preventDefault();
    this.wrapperElement.nativeElement.scrollBy({ left: e.deltaY })
  }
}

