import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  getRouteLastSegment(route: string) {
    return (route.match(/[\w]+$/) || [''])[0];
  }
}
