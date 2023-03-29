import { Inject, Injectable } from '@angular/core';
import { HomeState } from '../States/HomeState';
import { SummaryState } from '../States/SummaryState';
import { AbstractState } from '../States/AbstractState';
import { State } from '../States/State';
import * as THREE from 'three';
import { Scene } from '../../components/bg/Scene';
import { SampleState1 } from '../States/SampleState1';
import { SampleState2 } from '../States/SampleState2';
import { SampleState3 } from '../States/SampleState3';
import { SampleState4 } from '../States/SampleState4';

@Injectable({
  providedIn: 'root'
})
export class StatesFactoryService {
  private scene: Scene | null = null;

  private states = (): AbstractState[] => {
    const scene = this.scene || new Scene;
    return [
      new HomeState(scene),
      new SummaryState(scene),
      new SampleState1(scene),
      new SampleState2(scene),
      new SampleState3(scene),
      new SampleState4(scene),
    ];
  }

  public get(name: string): State | null {
    if (!this.scene) return null;
    return this.states().find(scene => scene.name === name) || null;
  }

  public setScene(scene: Scene) {
    this.scene = scene;
  }
}
