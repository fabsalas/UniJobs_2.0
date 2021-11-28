import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  /*usu="fabian";
  clave = 1234;
  usuario : string;
  contra : number;*/

  iniciarsesion: any = {
    nombre_usu : '',
    clave : ''
  };

  constructor(public toastController: ToastController, private router : Router, private servicioBD: DbService) { }

  ngOnInit() {
  }

  /*ingresar(){
    if (this.usuario == this.usu && this.contra == this.clave){
      this.router.navigate(['/home']);
    }
    else if(this.usuario == null || this.contra ==null){
      this.presentToast("Usuario o contraseña en blanco")
    }
    else{
      this.presentToast("Usuario o contraseña incorrecta")
    }
      
    
  }*/

  async ingresar(item){
    if(this.validateModel(this.ingresar)){
      await this.servicioBD.ingresar(this.iniciarsesion.nombre_usu, this.iniciarsesion.clave);
     //this.servicioBD.presentAlert(this.servicioBD.existe+"");
     if(this.servicioBD.usu_creado == 1){ let navigationExtras: NavigationExtras ={
      state : {textoEnviado : this.iniciarsesion.Usuario}
    }
      this.router.navigate(['./home'], navigationExtras);
    }

    }
    else{
      this.presentToast("Debe completar el campo:  " +this.field);
    }

  }

  field: string;
  validateModel(model:any){
    for(var [key,value] of Object.entries(model)){
      if(value == ""){
        this.field = key;
        return false;
      }
    }
    return true;
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