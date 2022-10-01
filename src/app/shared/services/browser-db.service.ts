import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrowserDbService {
  addBuilding: Subject<any> = new Subject();
  setItem(key: string, value: any) {
    return localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key) as any);
  }
}
