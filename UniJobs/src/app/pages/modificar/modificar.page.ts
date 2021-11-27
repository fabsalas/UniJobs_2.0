import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],


})
export class ModificarPage implements OnInit {
 /* empleo :any ={
    id_emp: '',
    status_emp:'',
    /*imageURL:'',
    titulo_emp: '',
    nombre_usu: '',
    descrip_emp: '',
    sueldo_emp:''
  }*/
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
  

  /*constructor(private router:Router, private activeroute:ActivatedRoute, private servicioBD: DbService) { 
  this.activeroute.queryParams.subscribe(params => {
    if(this.router.getCurrentNavigation().extras.state){
      this.empleo.Id = this.router.getCurrentNavigation().extras.state.cadenaTexto;
      this.empleo.Titulo_emp = this.router.getCurrentNavigation().extras.state.cadenaTexto2;
      this.empleo.Status_emp = this.router.getCurrentNavigation().extras.state.cadenaTexto3;
      this.empleo.Nombre_usu = this.router.getCurrentNavigation().extras.state.cadenaTexto4;
      this.empleo.Descrip_emp = this.router.getCurrentNavigation().extras.state.cadenaTexto5;
      this.empleo.Sueldo_emp = this.router.getCurrentNavigation().extras.state.cadenaTexto6;
    }
   })*/
   constructor(private router: Router, private activeroute: ActivatedRoute, private servicioBD: DbService) {
    this.activeroute.queryParams.subscribe(params => {
      if(this.router.getCurrentNavigation().extras.state){
        this.empleo.id_emp      = this.router.getCurrentNavigation().extras.state.cadenaTexto;
        this.empleo.titulo_emp  = this.router.getCurrentNavigation().extras.state.cadenaTexto2;
        this.empleo.descrip_emp  = this.router.getCurrentNavigation().extras.state.cadenaTexto3;
        this.empleo.pago_emp  = this.router.getCurrentNavigation().extras.state.cadenaTexto4;
        this.empleo.status_emp  = this.router.getCurrentNavigation().extras.state.cadenaTexto5;
        this.empleo.nombre_usu  = this.router.getCurrentNavigation().extras.state.cadenaTexto6;
        this.empleo.run_usu  = this.router.getCurrentNavigation().extras.state.cadenaTexto7;
      }
    })

  }

  ngOnInit() {
  }
  editaremp(){
    this.servicioBD.presentAlert(this.empleo.titulo_emp);
      this.servicioBD.updateEmpleo(this.empleo.id_emp, this.empleo.titulo_emp, this.empleo.descrip_emp, this.empleo.pago_emp, this.empleo.status_emp,this.empleo.nombre_usu, this.empleo.run_usu);
      this.servicioBD.presentAlert("Modificado");
      this.router.navigate(['/home']);
  }

 }
