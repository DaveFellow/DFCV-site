import { Component, Input } from '@angular/core';

@Component({
    selector: 'skill-card',
    templateUrl: './skill-card.component.html',
    styleUrls: ['./skill-card.component.scss'],
    standalone: false
})
export class SkillCardComponent {
  @Input() title: string = '';
}
