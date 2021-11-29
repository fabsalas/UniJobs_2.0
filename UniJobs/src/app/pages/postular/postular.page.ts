import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

//API sms, callnumber
import { SMS } from '@ionic-native/sms/ngx';

import { CallNumber } from '@ionic-native/call-number/ngx';
import { ToastController } from '@ionic/angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-postular',
  templateUrl: './postular.page.html',
  styleUrls: ['./postular.page.scss'],
})
export class PostularPage implements OnInit {

  empleo :any =
    {
      id_emp: '',
      titulo_emp: '',
      descrip_emp: '',
      pago_emp: '',
      status_emp: '',
      nombre_usu:'',
      run_usu: ''  
    }
  constructor(private router: Router, private activeroute: ActivatedRoute, private servicioBD: DbService, private sms: SMS , private callNumber: CallNumber, private toastCtrl: ToastController,
    private androidPermissions: AndroidPermissions) { 
    /*this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.empleo.id_emp      = this.router.getCurrentNavigation().extras.state.cadenaTexto;
        this.empleo.titulo_emp  = this.router.getCurrentNavigation().extras.state.cadenaTexto2;
        this.empleo.descrip_emp  = this.router.getCurrentNavigation().extras.state.cadenaTexto3;
        this.empleo.pago_emp  = this.router.getCurrentNavigation().extras.state.cadenaTexto4;
        this.empleo.status_emp  = this.router.getCurrentNavigation().extras.state.cadenaTexto5;
        this.empleo.nombre_usu  = this.router.getCurrentNavigation().extras.state.cadenaTexto6;
        this.empleo.run_usu  = this.router.getCurrentNavigation().extras.state.cadenaTexto7;
      }
    })*/
  }

  ngOnInit() {
  }

 


  postularemp(){
   
  }

  llamar(){
    this.callNumber.callNumber('(650) 555-1212', true).then(()=>{
      console.log('llamar funciona')

    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
    
  }

 


 enviarsms(){
    var options:{
      replaceLineBreaks: false,
      android: {
        intent: 'INTENT'
      }
    }
    this.sms.send('(650) 555-1212','Message', options).then(()=>{
      console.log('sms enviado')

    }).catch((err)=>{
      alert(JSON.stringify(err))
    });
  }

}


