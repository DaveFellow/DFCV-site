import { Component } from '@angular/core';
import { SkillCard } from 'src/app/shared/models/Skills';

@Component({
  selector: 'app-development-skills-page',
  templateUrl: './development-skills-page.component.html',
  styleUrls: ['./development-skills-page.component.scss']
})
export class DevelopmentSkillsPageComponent {
// ,,,UX Designer,Visual Design,,XT - Application Engineering,XT - Mobile Cross Platform,XT Web: Architect,XT Web: Banner,XT-Web: Responsive
// Other skills: Unity | C# | Vue | PHP | Laravel

  public cardsData: SkillCard[] = [
    {
      title: 'Interactive Dev',
      body: ['Specialized on interface programming'],
    }, {
      title: 'HTML / CSS',
      body: ['Most recent web standards and best practices'],
    }, {
      title: 'Javascript Development - JS',
      body: ['Everyone\'s parter on web development front. Vanilla or "flavoured".'],
    }, {
      title: 'Angular',
      body: ['The most state of the art web development framework for enterprise level software'],
    }, {
      title: 'Vue',
      body: ['Versatile and scalable for web projects'],
    }, {
      title: 'Mobile - Cross Platform',
      body: ['Using Ionic framework to create a highly versatile web development environment'],
    }, {
      title: 'Testing',
      body: ['To assure the best experience'],
    }, {
      title: 'Application Engineering',
      body: ['On the browser or native using the most state of the art web technologies'],
    }, {
      title: 'Responsive Web development',
      body: ['So we make sure nobody loose on the experience'],
    }, {
      title: 'Unity',
      body: ['For games and non-game graphically rich experiences'],
    }, {
      title: 'C#',
      body: ['Solid base on the grammar. Used alongside Unity but flexible enough to adapt as needed'],
    }, {
      title: 'PHP / Laravel',
      body: ['Some backend background is always good'],
    }
  ];
}
