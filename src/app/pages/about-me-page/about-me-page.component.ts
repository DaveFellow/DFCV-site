import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-about-me-page',
  templateUrl: './about-me-page.component.html',
  styleUrls: ['./about-me-page.component.scss']
})
export class AboutMePageComponent implements OnInit {
  public activeRoute: string = '/';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.activeRoute = this.getActiveRoute(this.router.url);
    
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.activeRoute = this.getActiveRoute((e as NavigationEnd).url));
  }

  getActiveRoute(url: string) {
    return (url.match(/[\w]+$/) || [''])[0];
  }
}
