import { Component } from '@angular/core';
import { BaseAppComponent } from '../base-app/base-app.component';
import { Themes } from '../../constants/themes';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent extends BaseAppComponent {
  constructor(private themeService: ThemeService) {
    super();
  }
  public themes = Themes;
  public currentTheme = this.themeService.theme;

  public changeTheme(theme: string) {
    this.themeService.theme = theme;
  }
}
