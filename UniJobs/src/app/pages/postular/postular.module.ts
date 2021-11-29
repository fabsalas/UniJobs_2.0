import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostularPageRoutingModule } from './postular-routing.module';

import { PostularPage } from './postular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostularPageRoutingModule
  ],
  declarations: [PostularPage]
})
export class PostularPageModule {}
