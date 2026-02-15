import { Component } from '@angular/core';
import { routeAnimations } from './about-me-page.anim';
import { CurrentRouteService } from 'src/app/shared/services/current-route.service';

@Component({
    selector: 'app-about-me-page',
    templateUrl: './about-me-page.component.html',
    styleUrls: ['./about-me-page.component.scss'],
    animations: [routeAnimations],
    standalone: false
})
export class AboutMePageComponent {
  constructor(public currentRoute: CurrentRouteService) {}
}
