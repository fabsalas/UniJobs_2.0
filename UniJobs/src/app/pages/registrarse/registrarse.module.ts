import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  FormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import { IonicModule } from '@ionic/angular';
import { MatIconModule } from '@angular/material/icon';
import { RegistrarsePageRoutingModule } from './registrarse-routing.module';

import { RegistrarsePage } from './registrarse.page';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrarsePageRoutingModule,
    MatStepperModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  declarations: [RegistrarsePage]
})
export class RegistrarsePageModule {}
