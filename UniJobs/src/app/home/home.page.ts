import { Component, OnInit,ViewChild, ElementRef, } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from '../services/db.service';

//import de api geolocation
import{ Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

//google maps



declare var google:any ;

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

  postulacion: any =[
    {
      id_post:'',
      id_emp: '',
      titulo_emp: '',
      pago_emp: '',
      run_usu: ''
    }
  ]

  mapa: any ;
  
  @ViewChild('mapa', {read: ElementRef, static: false}) mapRef: ElementRef;

  infoWindows : any [];
  marcadores: any = [{
    empleo: 'Manicure',
    direccion: 'av. las bellas',
    distancia: '1 km'

  },
  {
    empleo: 'Paseo perro',
    direccion: ' calle rojo',
    distancia: '2km'
  }]
  

  constructor(private router:Router, public servicioBD:DbService, private geolocation: Geolocation, private androidPermissions: AndroidPermissions) {}

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
    this.servicioBD.dbState().subscribe((res) =>{
      // this.servicioBD.presentAlert("2");
       if(res){
        // this.servicioBD.presentAlert("3");
         this.servicioBD.fetchPostulacion().subscribe(item =>{
           this.postulacion = item; 
         })
       }
       //this.servicioBD.presentAlert("4");
     });
  }

  

  /*permisos(){
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.SMS).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.SMS)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.SMS, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    }*/

  
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
               cadenaTexto5: item.nombre_usu,
               cadenaTexto6: item.run_usu
            }
    }
    this.router.navigate(['/modificar'], navigationExtras);
  }
  postular(item) {
    console.log(item);
    let navigationExtras: NavigationExtras = {
      state: { cadenaTexto: item.id_emp ,
               cadenaTexto2: item.titulo_emp, 
               cadenaTexto3: item.pago_emp,
               cadenaTexto4: item.run_usu
            }
    }
    this.router.navigate(['/postular'], navigationExtras);
  }

  //postular a empleo
  /*postular(item) {
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
    this.router.navigate(['/postular'], navigationExtras);
  }*/


 
  //funcion de api geolocalizacion
  mostrarGeo(){
 this.geolocation.getCurrentPosition().then((resp) => {
  resp.coords.latitude
  resp.coords.longitude
 }).catch((error) => {
   console.log('Error getting location', error);
 });

 let watch = this.geolocation.watchPosition();
 watch.subscribe((data) => {
  // data can be a set of coordinates, or an error (if an error occurred).
  //data.coords.latitude
  //data.coords.longitude
 });
  }


  
 //API google maps

  agregarMarcadoresMapa(marcadores){
    for(let marcador of marcadores){
      let position = new google.maps.LatLng(marcador.latitude, marcador.longitude);
      let mapMarker = new google.maps.marcadores({
        position: position,
        empleo: marcadores.empleo,
        direccion:marcadores.direccion,
        distancia: marcadores.distancia
      });

      mapMarker.setMapa(this.mapa);
      this.agregarInfoVentanaMarcador(mapMarker);
      }
    }
    agregarInfoVentanaMarcador(marcador){
      let infoWindowsContent = '<div id= "content">'+
                                  '<h2 id= "firstHeading" class"firstHeading">'+ marcador.empleo+'</h2>'
                                  '<p> direccion: '+marcador.direccion+ '</p>'
                                  '<p> direccion: '+marcador.distancia+ '</p>'
                                '</div>';

      let infoWindow = new google.maps.infoWindows({
        content: infoWindowsContent
      });
      marcador.addlistener('click', ()=> {
        this.cerrarInfoVentanaMarcador();
        infoWindow.open(this.mapa, marcador);
      });
      this.infoWindows.push(infoWindow);
    }

    cerrarInfoVentanaMarcador(){
      for (let window of this.infoWindows){
        window.close();
      }
    }
  

  ionViewDidEnter(){
    this.mostrarMapa();
  }
  /*ngAfterContentInit() {
    this.mostrarMapa();
}*/

//funcion para mostrar el mapa
 mostrarMapa(){
   const locacion = new google.maps.LatLng(-17.824858, 31.053028);
    const opciones ={
      center: locacion,
      zoom:  15,
      disableDefautlUI: true
    }
    this.mapa = new google.maps.Mapa(this.mapRef.nativeElement, opciones);
    this.agregarMarcadoresMapa(this.marcadores);
   }


}

