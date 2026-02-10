import { Component } from '@angular/core';
import { Tab } from 'src/app/shared/models/Tab';
import { tabs } from 'src/app/shared/objects/AboutMePage';

@Component({
    selector: 'app-summary-page',
    templateUrl: './summary-page.component.html',
    styleUrls: ['./summary-page.component.scss'],
    standalone: false
})
export class SummaryPageComponent {
  public tabs: Tab[] = tabs;
}
