import { Component } from '@angular/core';
import { pageLinks } from 'src/app/shared/objects/PageLinks';
import { CameraStateService } from 'src/app/shared/services/camera-state.service';

interface VisibilityConditions {
  [key: string]: () => boolean
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  public readonly links = [...pageLinks];
  private get angle() {
    return this.camStateService.angle;
  }
  
  // 3.2 ; -3.1 -
  public visibilityConditions: VisibilityConditions = {
    'about-me': () => this.angle < -3 || this.angle > 3,
    'history': () => this.angle > -3 && this.angle < -2,
    'skillset': () => this.angle > -2 && this.angle < -1,
    'graphic-design': () => this.angle > -1 && this.angle < 0,
    'software-dev': () => this.angle > 0 && this.angle < 1,
    'work-experience': () => this.angle > 1 && this.angle < 2,
  }
  
  constructor(public camStateService: CameraStateService) {}

  getVisibilityCondition(index: number) {
    const key = this.links[index];
  }
}
