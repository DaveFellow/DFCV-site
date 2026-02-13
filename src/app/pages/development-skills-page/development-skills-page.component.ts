import { Component } from '@angular/core';
import { SkillCard } from 'src/app/shared/models/Skills';
import { subpageHeaderAnimation } from '../skillset-page/skillset-page.anim';
import { backButtonSizes } from 'src/app/shared/objects/SkillsetPage';

@Component({
    selector: 'app-development-skills-page',
    templateUrl: './development-skills-page.component.html',
    styleUrls: [ './development-skills-page.component.scss' ],
    animations: [subpageHeaderAnimation],
    standalone: false
})
export class DevelopmentSkillsPageComponent {
  public backButtonSizes = backButtonSizes;
  
  public cardsData: SkillCard[] = [
    {
      title: 'UI/UX Programmer',
      body: [ 'Specialized on user interface and experience programming.' ],
    }, {
      title: 'HTML / CSS',
      body: [ 'Most recent web standards and best practices.' ],
    }, {
      title: 'Javascript Development',
      body: [ 'Everyone\'s partner on web development front. Vanilla or "flavoured" with any framework.' ],
    }, {
      title: 'Angular',
      body: [ 'The most state of the art web development framework for enterprise level software.' ],
    }, {
      title: 'Mobile - Cross Platform',
      body: [ 'Using Ionic framework to create a highly versatile web development environment.' ],
    }, {
      title: 'Unit Testing',
      body: [ 'To assure the best software quality.' ],
    }, {
      title: 'E2E Testing',
      body: [ 'To assure the best user experience across all platforms and devices.' ],
    }, {
      title: 'Application Engineering',
      body: [ 'On the browser or native using the most state of the art web technologies.' ],
    }, {
      title: 'Responsive Development',
      body: [ 'Any screen size, any device, any experience.' ],
    }, {
      title: 'Unity',
      body: [ 'For game development and for non-game graphically rich applications.' ],
    }, {
      title: 'C#',
      body: [ 'Mostly used alongside Unity. flexible enough to adapt as needed to any environment or framework.' ],
    }, {
      title: 'PHP / Laravel',
      body: [ 'Some backend background is always good.' ],
    }
  ];
}
