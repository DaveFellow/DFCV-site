import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { pageLinks } from '../../objects/PageLinks';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  public activeRoute: string = '/';
  public activeRouteRoot: string = '/';

  public readonly links = [...pageLinks];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.activeRoute = (e as NavigationEnd).url;
        this.activeRouteRoot = (this.activeRoute.match(/\/[\w-]+/) || ['/'])[0];
      });
  }
}
