import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'skill-card',
    templateUrl: './skill-card.component.html',
    styleUrls: ['./skill-card.component.scss'],
    imports: [
      CommonModule
    ],
    standalone: true
})
export class SkillCardComponent {
  @Input() title: string = '';
}
