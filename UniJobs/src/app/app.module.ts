import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import de base de datos
import { SQLite } from '@ionic-native/sqlite/ngx';

//import de api geolocation
import { Geolocation } from '@ionic-native/geolocation/ngx';
//Api sms & llamada
import { SMS } from '@ionic-native/sms/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

import {MatStepperModule} from '@angular/material/stepper';
import {MatSliderModule} from '@angular/material/slider';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, BrowserAnimationsModule],
  providers: [{ provide:  RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, Geolocation, SMS, CallNumber, AndroidPermissions,MatStepperModule,MatSliderModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
  