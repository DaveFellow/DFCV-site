import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { animations } from './skillset-page.anim';
import { CurrentRouteService } from 'src/app/shared/services/current-route.service';

@Component({
    selector: 'app-skillset-page',
    templateUrl: './skillset-page.component.html',
    styleUrls: ['./skillset-page.component.scss'],
    animations: [animations],
    standalone: false
})
export class SkillsetPageComponent {
  constructor(public currentRoute: CurrentRouteService) {}
}
