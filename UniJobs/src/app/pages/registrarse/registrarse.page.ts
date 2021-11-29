import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AlertController, NavController } from '@ionic/angular';
@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.page.html',
  styleUrls: ['./registrarse.page.scss'],
  providers: [
    {
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue:{
      showError:true,
      displayDefaultIndicatorType: false
    }
    }
  ]
})
export class RegistrarsePage implements OnInit {
  public ocultar1: boolean = false;
  public ocultar2: boolean = true;
 
  accion1(){
  this.ocultar1 = !this.ocultar1;
  this.ocultar2 = !this.ocultar2;
  }
 
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  constructor(private _formBuilder: FormBuilder,public alertController: AlertController, public navCtrl: NavController) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
    });
  }
  Mostrar() {
    this.presentAlert("Código de verificación","Hemos enviado un sms con su código de verificación, por favor, ingréselo a continuación: ");
    }
    async presentAlert(titulo:string,message:string){
      const alert = await this.alertController.create({
        header: titulo,
        message: message,
        buttons: ['Aceptar'],
        inputs: [
          {
            name: 'code',
            placeholder: 'Ingrese su código de verificación'
          },
        ],
      });
      await alert.present();
    }
}
