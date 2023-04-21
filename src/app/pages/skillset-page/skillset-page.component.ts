import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';
import { animations } from './skillset-page.anim';

@Component({
  selector: 'app-skillset-page',
  templateUrl: './skillset-page.component.html',
  styleUrls: ['./skillset-page.component.scss'],
  animations: [ animations ]
})
export class SkillsetPageComponent {
  public activeRoute!: string;

  constructor(
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.activeRoute = this.utils.getRouteLastSegment(this.router.url);
    
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.activeRoute = this.utils.getRouteLastSegment((e as NavigationEnd).url);
        // debugger;
      });
  }
}
