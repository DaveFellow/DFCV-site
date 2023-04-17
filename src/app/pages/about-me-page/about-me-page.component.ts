import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { UtilsService } from 'src/app/shared/services/utils.service';

@Component({
  selector: 'app-about-me-page',
  templateUrl: './about-me-page.component.html',
  styleUrls: ['./about-me-page.component.scss']
})
export class AboutMePageComponent implements OnInit {
  public activeRoute: string = '/';

  constructor(
    private router: Router,
    private utils: UtilsService
  ) {}

  ngOnInit(): void {
    this.activeRoute = this.utils.getRouteLastSegment(this.router.url);
    
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.activeRoute = this.utils.getRouteLastSegment((e as NavigationEnd).url));
  }
}
