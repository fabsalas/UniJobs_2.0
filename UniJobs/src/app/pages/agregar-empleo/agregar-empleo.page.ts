import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-agregar-empleo',
  templateUrl: './agregar-empleo.page.html',
  styleUrls: ['./agregar-empleo.page.scss'],
})
export class AgregarEmpleoPage implements OnInit {

  /*empleo :any []=[]*/

 /* empleo :any =[
    {
      Titulo_emp:'',
      status_emp:'',  
      nombre_usu:'',
      descrip_emp:'',
      sueldo_emp:''
    }
  ]*/
  empleo :any =[
    {
      id_emp : '',
      titulo_emp: '',
      descrip_emp: '',
      pago_emp: '',
      status_emp: '' 
    }
  ]
  constructor(private router: Router, private servicioBD: DbService) { }

  ngOnInit() {
  }

  agregaremp(){
    this.servicioBD.addEmpleo(this.empleo.titulo_emp, this.empleo.descrip_emp, this.empleo.pago_emp,this. empleo.status_emp);
    this.servicioBD.presentAlert("Registro realizado");
    /*console.log('lol');*/
    this.router.navigate(['/home']);
  }

  
}
