import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private lastDeltaTime = 0;

  getRouteLastSegment(route: string) {
    return (route.match(/[\w-]+$/) || [''])[0];
  }

  getDeltaTime(): number {
    const now = new Date().getTime() / 1000;
    const delta = Math.max(0, now - this.lastDeltaTime);
    this.lastDeltaTime = now;
    return delta;
  }

  resetDeltaTime(): void {
    this.lastDeltaTime = 0;
  }
}
