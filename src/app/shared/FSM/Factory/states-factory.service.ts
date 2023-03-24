import { Inject, Injectable } from '@angular/core';
import { HomeState } from '../States/HomeState';
import { SummaryState } from '../States/SummaryState';
import { AbstractState } from '../States/AbstractState';
import { State } from '../States/State';
import * as THREE from 'three';
import { Scene } from '../../components/bg/Scene';

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
