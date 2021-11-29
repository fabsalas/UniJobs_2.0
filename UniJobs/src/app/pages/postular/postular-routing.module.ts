import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostularPage } from './postular.page';

const routes: Routes = [
  {
    path: '',
    component: PostularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostularPageRoutingModule {}
