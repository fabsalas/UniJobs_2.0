import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import {MatStepperModule} from '@angular/material/stepper';
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
 

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;



 
  usuario: any =[
    {
      numero_usu: '',
      nombre: '',
	    apellido: '',
	    run_usu: '',
	    fec_nac: '',
	    correo: '',
	    nombre_usu: '',
      clave: '',
	    claver: '',
    }
  ]

 
  constructor(private _formBuilder: FormBuilder,public alertController: AlertController, public navCtrl: NavController, private router: Router, private servicioBD: DbService, public toastController: ToastController ) {}

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
//desaparecer boton
    accion1(){
      if (this.firstFormGroup.valid)
        {
          this.ocultar1 = !this.ocultar1
        }
        else if(this.secondFormGroup.valid){
          this.ocultar1 = !this.ocultar1
        }
      }

//guardar primer formgroup
    async Guardar(){
      //var f = this.firstFormGroup.value;
        if(this.firstFormGroup.invalid){
          const alert = await this.alertController.create({
            header: 'Campo vacio',
            message: 'Debe ingresar su número telefónico',
            buttons: ['Aceptar'],


            //console.log('guardado')
        });

            await alert.present();
            return;   
        }
        else if(this.usuario.numero_usu > 9 && this.usuario.numero_usu < 0){
          this.presentToast("Número invalido")

        }
        
    };



//Guardar segundo formgroup
    async Guardar2(){
      //var f = this.secondFormGroup.value;

      if(this.secondFormGroup.invalid){
        const alert = await this.alertController.create({
          header: 'Campos vacios',
          message: 'Debe ingresar todos los datos personales.',
          buttons: ['Aceptar'],


          //console.log('guardado')
      });
        
          await alert.present();
          return;   
      }
      else if(this.usuario.run_usu > 9 && this.usuario.run_usu < 0){
        this.presentToast("Run invalido")
      }
      else if(this.usuario.nombre  < 2 ){
        this.presentToast("Nombre no existe, debe tener más de 2 letras")
      }
      else if(this.usuario.apellido  < 2 ){
        this.presentToast("Apellido no existe, debe tener más de 2 letras")
      }  
  }


    async Guardar3(){
      //var f = this.secondFormGroup.value;

      if(this.secondFormGroup.invalid){
        const alert = await this.alertController.create({
          header: 'Campos vacios',
          message: 'Debe ingresar todos los datos para iniciar sesión.',
          buttons: ['Aceptar'],

    })
      await alert.present();
      return;  
    }
      else if(this.usuario.correo  == '/[a-zA-Z0-9_.+-]'+'@[a-zA-Z0-9-]'){
     
    } 
    else if(this.usuario.correo  == 0){
        this.presentToast("Correo vacio")
    }
    else if(this.usuario.nombre_usu < 2 && this.usuario.nombre_usu <= 0){
      this.presentToast("nombre usuario debe tener más de 2 caracters")
    }
    else if(this.usuario.clave < 4 && this.usuario.clave > 16 ){
      this.presentToast("Por sus seguridad la contraseña debe tener entre 4 y 16 caracteres")
    }
    else if(this.usuario.clave != this.usuario.claver){
      this.presentToast("Las contraseña no coinciden")

    }

    this.servicioBD.addUsuario(this.usuario.numero_usu, this.usuario.nombre, this.usuario.apellido, this.usuario.run_usu, this.usuario.fec_nac,
    this.usuario.correo, this.usuario.nombre_usu, this.usuario.clave);
    this.servicioBD.presentAlert("Registro realizado")
    this.router.navigate(['/home']);
  }

  async presentToast(message: string, duration?: number){
    const toast = await this.toastController.create(
      {
        message: message,
        duration: duration?duration:2000
      }
    );
    toast.present();
  }
}
