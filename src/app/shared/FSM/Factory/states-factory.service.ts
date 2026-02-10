import { Injectable } from '@angular/core';
import { HomeState } from '../States/HomeState';
import { HomeStateAlt } from '../States/HomeStateAlt';
import { SummaryState } from '../States/SummaryState';
import { AbstractState } from '../States/AbstractState';
import { State } from '../States/State';
import { Scene } from '../../components/bg/Scene';
import { HistoryState } from '../States/HistoryState';
import { SkillsetState } from '../States/SkillsetState';
import { SummaryStateAlt } from '../States/SummaryStateAlt';
import { WorkExperienceState } from '../States/WorkExperienceState';
import { SoftwareDevelopmentState } from '../States/SoftwareDevelopmentState';
import { GraphicDesignState } from '../States/GraphicDesignState';

@Injectable({
  providedIn: 'root'
})
export class StatesFactoryService {
  private scene: Scene | null = null;
  private states: AbstractState[] = [];

  public get(name: string): State | null {
    if (!this.scene) return null;
    return this.states.find(scene => scene.name === name) || null;
  }

  public setup(scene: Scene) {
    this.scene = scene;
    this.states = [
      new HomeState(scene),
      new HomeStateAlt(scene),
      new SummaryState(scene),
      new SummaryStateAlt(scene),
      new HistoryState(scene),
      new SkillsetState(scene),
      new SoftwareDevelopmentState(scene),
      new GraphicDesignState(scene),
      new WorkExperienceState(scene),
    ];
  }
}
