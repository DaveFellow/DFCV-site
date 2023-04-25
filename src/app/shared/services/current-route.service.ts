import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentRouteService {
  private _route: string = '';
  
  public segment: string = '';

  public get path(): string {
    return this._route;
  }

  constructor(private utils: UtilsService) { }

  public setRoute(route: string): string {
    this._route = route;
    this.segment = this.utils.getRouteLastSegment(this._route);
    console.log(this.segment);
    return this._route;
  }
}
