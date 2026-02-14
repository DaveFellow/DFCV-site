import { Component, HostListener, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  public mobileMenuOpen = signal(false);
  public isInMobile = signal(window.innerWidth <= 900);

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

  public linkIsActive(route: string): boolean {
    return (route.startsWith(this.activeRouteRoot) && this.activeRouteRoot !== '/') || (this.activeRouteRoot === '/' && route === '/home');
  }

  @HostListener('window:resize')
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
