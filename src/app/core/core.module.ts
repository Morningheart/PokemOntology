import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoadingComponent } from './components/loading/loading.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { BaseAppComponent } from './components/base-app/base-app.component';
import { ModalInjectorComponent } from './components/modal-injector/modal-injector.component';
import { ToastComponent } from './components/toast/toast.component';
import { BaseModalComponent } from './components/base-modal/base-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ToastComponent,
    LoadingComponent,
    NotFoundComponent,
    NavBarComponent,
    BaseAppComponent,
    ModalInjectorComponent,
    BaseModalComponent,
  ],
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  providers: [],
  exports: [
    ToastComponent,
    LoadingComponent,
    NotFoundComponent,
    NavBarComponent,
    ModalInjectorComponent,
  ],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {}
}
