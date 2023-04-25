import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { routeAnimations } from './about-me-page.anim';
import { CurrentRouteService } from 'src/app/shared/services/current-route.service';

@Component({
  selector: 'app-about-me-page',
  templateUrl: './about-me-page.component.html',
  styleUrls: ['./about-me-page.component.scss'],
  animations: [ routeAnimations ]
})
export class AboutMePageComponent {
  constructor(public currentRoute: CurrentRouteService) {}
}
