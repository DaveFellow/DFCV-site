import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { routeAnimations } from './app.anim';
import { filter } from 'rxjs';
import { CurrentRouteService } from './shared/services/current-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimations ]
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'David Fuentes :: CV';

  bgPaused: boolean = false;

  canControl: boolean = false;

  _debug: boolean = true;

  constructor(
    private cd: ChangeDetectorRef,
    private router: Router,
    private currentRoute: CurrentRouteService
  ) {}

  ngOnInit() {
    this.currentRoute.setRoute(this.router.url);
    
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
