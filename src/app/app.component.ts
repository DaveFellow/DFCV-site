import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routeAnimations } from './app.anim';
import { filter, interval, map, Observable, takeUntil } from 'rxjs';
import { CurrentRouteService } from './shared/services/current-route.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routeAnimations],
    standalone: false
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'David Fuentes :: CV';

  bgPaused: boolean = false;

  canControl: boolean = false;

  showOverlay: boolean = true;

  _debug: boolean = true;

  helloText: Observable<string> = interval(100).pipe(
    map(i => {
      const str = 'Hello :)';
      return str.slice(0, Math.min(i + 1, str.length));
    }),
    takeUntil(interval(1500))
  );

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private currentRoute: CurrentRouteService
  ) {}

  ngOnInit() {
    this.currentRoute.setRoute(this.router.url);
    setTimeout(() => this.showOverlay = false, 2500);
    
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.currentRoute.setRoute((e as NavigationEnd).url);
        this.canControl = false;
        if (this.currentRoute.segment != 'home') return;
        setTimeout(() => this.canControl = true, 700);
      });
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }
}
