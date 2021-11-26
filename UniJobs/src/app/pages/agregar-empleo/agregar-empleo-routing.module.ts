import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarEmpleoPage } from './agregar-empleo.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarEmpleoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarEmpleoPageRoutingModule {}
