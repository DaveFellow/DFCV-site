import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScreenResolutionService {
  public currentResolution = signal({
    x: 0,
    y: 0,
  });
}
