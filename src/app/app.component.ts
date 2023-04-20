import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import { routeAnimations } from './app.anim';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ routeAnimations ]
})
export class AppComponent implements AfterViewChecked {
  title = 'David Fuentes :: CV';

  bgPaused: boolean = false;

  _debug: boolean = true;

  constructor(
    private cd: ChangeDetectorRef,
    private contexts: ChildrenOutletContexts
  ) {}

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  public getAnimation = () => this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
}
