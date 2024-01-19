import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private _theme: BehaviorSubject<string> = new BehaviorSubject<string>(
    localStorage.getItem('theme') || 'dark'
  );

  constructor() {}

  get theme$() {
    return this._theme.asObservable();
  }

  set theme(theme: string) {
    this._theme.next(theme);
    localStorage.setItem('theme', theme);
  }

  get theme() {
    return this._theme.getValue();
  }
}
