import { Component } from '@angular/core';
import { SkillCard } from 'src/app/shared/models/Skills';
import { subpageHeaderAnimation } from '../skillset-page/skillset-page.anim';
import { backButtonSizes } from 'src/app/shared/objects/SkillsetPage';

@Component({
    selector: 'app-design-skills-page',
    templateUrl: './design-skills-page.component.html',
    styleUrls: [ './design-skills-page.component.scss' ],
    animations: [subpageHeaderAnimation],
    standalone: false
})
export class DesignSkillsPageComponent {
  public backButtonSizes = backButtonSizes;

  public cardsData: SkillCard[] = [
    {
      title: 'Graphic Design',
      body: [ 'As a graphic design and developer, working alongside other designers can be a latency-free process' ]
    }, {
      title: 'UX Design',
      body: [ 'Great understanding on what makes a system usable and comfortable for the final user' ]
    }, {
      title: 'Standard tools',
      body: [ 'Can work and understand the workflow with standard design tools such as the Adobe CC and Figma' ]
    }, {
      title: 'Design system',
      body: [ 'Can create, understand and implement into code design systems for different branding' ]
    }, {
      title: '3D Modeling and Animation',
      body: [ 'Can create and animate 3D models for real time applications, such as games or simulations, using Blender' ]
    }, {
      title: 'Illustrations / Digital Painting',
      body: [ 'Can draw and paint high quality illustrations for any project, from concept to final output' ]
    }, {
      title: '2D Animation',
      body: [ 'From the storyboard to final 2D animations, I can bring life to any concept' ]
    }, {
      title: 'Taking the Steer',
      body: [ 'Whenever it\'s necessary, I can take care of the full requirement from design to code implementation' ]
    }, 
  ];
}
