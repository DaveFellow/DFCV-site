import { Component } from '@angular/core';
import { pageLinks } from 'src/app/shared/objects/PageLinks';
import { CameraAngleService } from 'src/app/shared/services/camera-angle.service';

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
    return this.camAngleService.angle;
  }
  
  public visibilityConditions: VisibilityConditions = {
    'about-me': () => this.angle > 1.8 && this.angle < 2.5,
    'skillset': () => this.angle > 2.8 || this.angle < -3,
    'work-experience': () => this.angle > -2.8 && this.angle < -2,

    // 'about-me': { min: 1.7, max: 2.8 },
    // 'skillset': { min: 2.81, max: 3.12 },
    // 'work-experience': { min: 1.7, max: 2.8 },
  }
  
  constructor(public camAngleService: CameraAngleService) {}

  getVisibilityCondition(index: number) {
    const key = this.links[index];

  }
}
