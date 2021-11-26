import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarEmpleoPageRoutingModule } from './agregar-empleo-routing.module';

import { AgregarEmpleoPage } from './agregar-empleo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarEmpleoPageRoutingModule
  ],
  declarations: [AgregarEmpleoPage]
})
export class AgregarEmpleoPageModule {}
