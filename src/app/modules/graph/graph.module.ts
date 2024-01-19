import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraphRoutingModule } from './graph-routing.module';
import { GraphPageComponent } from './pages/graph-page/graph-page.component';

@NgModule({
  declarations: [GraphPageComponent],
  imports: [CommonModule, GraphRoutingModule],
})
export class GraphModule {}
