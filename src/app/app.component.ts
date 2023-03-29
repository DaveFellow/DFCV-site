import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewChecked {
  title = 'df-portfolio-site';

  bgPaused: boolean = false;

  _debug: boolean = false;

  // debug
  constructor(private cd: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }
  //end debug
}
