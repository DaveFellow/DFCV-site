import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraStateService {
  private prevAngle: number = 0;
  private currentAngle: number = 0;
  public get angle() {
    return this.currentAngle;
  }
  
  public isMoving = false;

  public isInHomeState = false;

  public updateAngle(angle: number) {
    if (angle == this.prevAngle) return;
    this.prevAngle = this.currentAngle;
    this.currentAngle = angle;
  }
}
