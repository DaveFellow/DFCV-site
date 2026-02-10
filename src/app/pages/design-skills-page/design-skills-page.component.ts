import { Component } from '@angular/core';
import { SkillCard } from 'src/app/shared/models/Skills';
import { subpageHeaderAnimation } from '../skillset-page/skillset-page.anim';

@Component({
    selector: 'app-design-skills-page',
    templateUrl: './design-skills-page.component.html',
    styleUrls: ['./design-skills-page.component.scss'],
    animations: [subpageHeaderAnimation],
    standalone: false
})
export class DesignSkillsPageComponent {
  public cardsData: SkillCard[] = [
    {
      title: 'Graphic Design',
      body: ['As a graphic design and developer, working alongside other designers can be a latency-free process']
    }, {
      title: 'UX Desig',
      body: ['Great understand on what makes a system usable and comfortable for the final user']
    }, {
      title: 'Standard tools',
      body: ['Can work and understand the workflow with standard design tools such as the Adobe CC and Figma']
    }, {
      title: 'Design system',
      body: ['Can create, understand and implement into code design systems for different branding']
    }, {
      title: 'Taking the Steer',
      body: ['Whenever it\'s necessary, he can take care of the full requirement from design to implementation']
    }, 
  ];
}
