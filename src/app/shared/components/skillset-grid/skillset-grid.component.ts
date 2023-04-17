import { Component, Input } from '@angular/core';
import { SkillCard } from '../../models/Skills';

@Component({
  selector: 'skillset-grid',
  templateUrl: './skillset-grid.component.html',
  styleUrls: ['./skillset-grid.component.scss']
})
export class SkillsetGridComponent {
  @Input() data: SkillCard[] = [];
}
