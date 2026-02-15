import { Component, Input } from '@angular/core';
import { SkillCard } from '../../models/Skills';
import { skillsetGridAnim } from './skillset-grid.anim';
import { SkillCardComponent } from '../skill-card/skill-card.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'skillset-grid',
    templateUrl: './skillset-grid.component.html',
    styleUrls: ['./skillset-grid.component.scss'],
    animations: [skillsetGridAnim],
    imports: [
      CommonModule,
      SkillCardComponent
    ],
    standalone: true
})
export class SkillsetGridComponent {
  @Input() data: SkillCard[] = [];
}
