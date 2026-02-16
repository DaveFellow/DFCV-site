import { Component, effect, HostListener, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { pageLinks } from '../../objects/PageLinks';
import { CommonModule } from '@angular/common';
import { LinkButtonComponent } from '../link-button/link-button.component';
import { ScreenResolutionService } from '../../services/screen-resolution.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    imports: [
      CommonModule,
      LinkButtonComponent,
      RouterModule
    ],
    standalone: true,
})
export class HeaderComponent implements OnInit {
  public activeRoute: string = '/';
  public activeRouteRoot: string = '/';
  public mobileMenuOpen = signal(false);
  public isInMobile = signal(window.innerWidth <= 900);

  public readonly links = [...pageLinks];

  constructor(
    private router: Router,
    private screenResolutionService: ScreenResolutionService
  ) {
    effect(() => {
      this.screenResolutionService.currentResolution();
      this.onResize();
    });
  }

  ngOnInit(): void {
    this.onResize();
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => {
        this.activeRoute = (e as NavigationEnd).url;
        this.activeRouteRoot = (this.activeRoute.match(/\/[\w-]+/) || ['/'])[0];
      });
  }

  public linkIsActive(route: string): boolean {
    return (route.startsWith(this.activeRouteRoot) && this.activeRouteRoot !== '/') || (this.activeRouteRoot === '/' && route === '/home');
  }

  public onResize(): void {
    this.mobileMenuOpen.set(false);
    this.isInMobile.set(window.innerWidth <= 900);
  }

  public goToRoute(route: string): void {
    if (this.router.url === route) return;
    this.router.navigate([route]);
    this.mobileMenuOpen.set(false);
  }

  public toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }
}
