import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage  implements OnInit{
  public ocultar1: boolean = false;
  public ocultar2: boolean = true;
 
  accion1(){
  this.ocultar1 = !this.ocultar1;
  this.ocultar2 = !this.ocultar2;
  }
  /*empleo: any [] = []*/
  sesion: any = {
    nombre_usu : ''
  };
  empleo: any =[
    {
      id_emp: '',
      titulo_emp: '',
      descrip_emp: '',
      pago_emp: '',
      status_emp: '',
      nombre_usu:'',
      run_usu: ''
    }
  ]

  constructor(private router:Router, public servicioBD:DbService) {

  }

  ngOnInit(){
   // this.servicioBD.presentAlert("1");
    this.servicioBD.dbState().subscribe((res) =>{
     // this.servicioBD.presentAlert("2");
      if(res){
       // this.servicioBD.presentAlert("3");
        this.servicioBD.fetchEmpleos().subscribe(item =>{
          this.empleo = item;
        })
      }
      //this.servicioBD.presentAlert("4");
    });
  }

  
/**Funcion del segment para manipular la informacion en el home */


  getItem($event){
    const valor = $event.target.value;
    console.log(valor);
  } 



  eliminar(item){
    this.servicioBD.deleteEmpleo(item.id_emp);
    this.servicioBD.presentAlert("Empleo Eliminado");
  }

  modificar(item) {
    console.log(item);
    let navigationExtras: NavigationExtras = {
      state: { cadenaTexto: item.id_emp ,
               cadenaTexto2: item.titulo_emp, 
               cadenaTexto3: item.descrip_emp,
               cadenaTexto4: item.pago_emp,
               cadenaTexto5: item.status_emp,
               cadenaTexto6: item.nombre_usu,
               cadenaTexto7: item.run_usu
            }
    }
    this.router.navigate(['/modificar'], navigationExtras);
  }

}
