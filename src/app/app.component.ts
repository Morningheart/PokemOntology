import { Component } from '@angular/core';
import { BaseAppComponent } from './core/components/base-app/base-app.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseAppComponent {
  constructor() {
    super();
  }
}
