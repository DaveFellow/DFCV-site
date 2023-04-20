import { Component, Input } from '@angular/core';
import { SkillCard } from '../../models/Skills';
import { skillsetGridAnim } from './skillset-grid.anim';

@Component({
  selector: 'skillset-grid',
  templateUrl: './skillset-grid.component.html',
  styleUrls: ['./skillset-grid.component.scss'],
  animations: [skillsetGridAnim]
})
export class SkillsetGridComponent {
  @Input() data: SkillCard[] = [];
}
