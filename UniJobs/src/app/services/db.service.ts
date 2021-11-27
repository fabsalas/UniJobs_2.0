import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Empleos } from './empleos';
import { Usuarios } from './Usuarios';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  public database: SQLiteObject;

  //tabla usuario//
  TablaUsuarios: string = "CREATE TABLE IF NOT EXISTS usuario(run_usu INTEGER PRIMARY KEY, numero_usu INTEGER NOT NULL, nombre VARCHAR(50) NOT NULL, apellido VARCHAR(50) NOT NULL, fec_nac DATE NOT NULL, correo VARCHAR(50) NOT NULL, nombre_usu VARCHAR(50)NOT NULL, clave VARCHAR(50)NOT NULL);";
  registro_usu: string = "INSERT or IGNORE INTO usuario(run_usu, numero_usu, nombre, apellido, fec_nac, correo, nombre_usu, clave) VALUES (123456789, 12345678,'Nicolas', 'sanchez', 09/10/1998, 'nnm@jkl.com', 'nico', '123qwe');";
  /*tabla empleos */
  dropemp:string = "DROP TABLE empleo;"
  TablaEmpleos: string = "CREATE TABLE IF NOT EXISTS empleo(id_emp INTEGER PRIMARY KEY AUTOINCREMENT, titulo_emp VARCHAR(50) NOT NULL, descrip_emp VARCHAR(50) NOT NULL, pago_emp NUMBER(4) NOT NULL, status_emp VARCHAR(50)NOT NULL, nombre_usu VARCHAR(50) NOT NULL,run_usu INTEGER NOT NULL,FOREIGN KEY (run_usu) REFERENCES usuario (run_usu));";
  registro_emp: string = "INSERT or IGNORE INTO empleo(id_emp, titulo_emp, descrip_emp, pago_emp, status_emp,nombre_usu,run_usu) VALUES (1,'Paseo perruno','Necesito que alguien realice el paseo perruno', 2000, 'ayer','nico',204679525);";
  /*update_emp :string = "UPDATE empleo SET titulo = 'zapato', texto = '123124214'  WHERE id = 1";*/  

  listaEmpleos = new BehaviorSubject([]);
  listaUsuarios = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  usu_creado: number = 0;
  private isUserReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, public alertController: AlertController) {
    this.crearBD();

    //this.buscarEmpleos();
    //this.presentAlert("todo listo");
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'empleos3.db',
        location: 'default'

      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentAlert("BD Creada"); 
        //llamamos a la creación de tablas
        this.crearTablas();
      }).catch(e => this.presentAlert(e));
    })
  }


  async crearTablas() {
    try {
      //ejecutamos la creacion de tabla empleo
      //await this.database.executeSql(this.dropemp, []);
      await this.database.executeSql(this.TablaEmpleos, []);
      await this.database.executeSql(this.registro_emp, []);
      
      
      this.presentAlert("Creo la Tabla empleos");
      //ejecutamos la creacion de tabla Usuario
      await this.database.executeSql(this.TablaUsuarios, []);
      await this.database.executeSql(this.registro_usu, []);
         /*await this.database.executeSql(this.update_emp, []);*/
      this.presentAlert("Creo la Tabla Usuario");
      this.buscarEmpleos();
      this.buscarUsuarios();
      this.presentAlert("Ha ocurrido un error inesperado al crear la tabla:  " + this.TablaEmpleos);
      this.isDbReady.next(true);
    } catch (error) {
      this.presentAlert("Ha ocurrido un error inesperado al crear la tabla:  " + error.message);
    }
  }

  buscarEmpleos() {
    return this.database.executeSql('SELECT * FROM empleo', []).then(res => {
      let items: Empleos[] = [];
      //this.presentAlert("b");
      if (res.rows.length > 0) {
       //this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) { 
        // this.presentAlert("d");
          items.push({ 
            id_emp: res.rows.item(i).id_emp,
            titulo_emp: res.rows.item(i).titulo_emp,
            descrip_emp: res.rows.item(i).descrip_emp,
            pago_emp: res.rows.item(i).pago_emp,
            status_emp:res.rows.item(i).status_emp,
            nombre_usu: res.rows.item(i).nombre_usu,
            run_usu:res.rows.item(i).run_usu
           });
        }
      }
      
      this.listaEmpleos.next(items);
      this.presentAlert("e");
    }).catch(e => this.presentAlert(e));
  }


  /**TOMA TODO EL OBSERVABLE Y GENERA COMO UNA COLECION EN JAVA Y LO RETORNA */
  fetchEmpleos(): Observable<Empleos[]> {
    return this.listaEmpleos.asObservable();
  }

  //funciones
  addEmpleo(titulo_emp, descrip_emp, pago_emp, status_emp) {
    let data = [titulo_emp, descrip_emp, pago_emp, status_emp];
    return this.database.executeSql('INSERT INTO empleo (titulo_emp, descrip_emp, pago_emp, status_emp) VALUES (?, ?, ?, ?)', data)
      .then(_res => {
        this.buscarEmpleos();
      })
  }

  updateEmpleo(id_emp, titulo_emp, descrip_emp, pago_emp, status_emp) {
    //this.presentAlert(titulo);
    let data = [titulo_emp, descrip_emp, pago_emp, status_emp, id_emp];
    //this.presentAlert(id+"");
    return this.database.executeSql('UPDATE empleo SET titulo_emp = ?, descrip_emp = ? , pago_emp= ?, status_emp= ?,  WHERE id = ?', data)
      .then(data => {
        //this.presentAlert("b");
        this.buscarEmpleos();
       // this.presentAlert("c");

      }) /*c*/
      
  }

  deleteEmpleo(id_emp) {
    return this.database.executeSql('DELETE FROM empleo WHERE id_emp = ?',[id_emp])
      .then(_ => {
        this.buscarEmpleos();
      });
  }

  //Funciones usuarios

buscarUsuarios() {
  //this.presentAlert("a");
  return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
    let items: Usuarios[] = [];
    //this.presentAlert("b");
    if (res.rows.length > 0) {
      //this.presentAlert("c");
      for (var i = 0; i < res.rows.length; i++) { 
        //this.presentAlert("d");
        items.push({ 
          numero_usu: res.rows.item(i).numero_usu,
          nombre: res.rows.item(i).nombre,
          apellido: res.rows.item(i).apellido,
          run_usu: res.rows.item(i).run_usu,
          fec_nac: res.rows.item(i).fec_nac,
          correo: res.rows.item(i).correo,
          nombre_usu: res.rows.item(i).nombre_usu,
          clave:  res.rows.item(i).clave
         });
      }
    }
    //this.presentAlert("d");
    this.listaUsuarios.next(items);
  });
}

/**TOMA TODO EL OBSERVABLE Y GENERA COMO UNA COLECION EN JAVA Y LO RETORNA */
fetchUsuarios(): Observable<Usuarios[]> {
  return this.listaUsuarios.asObservable();
}

addUsuario(numero_usu, nombre, apellido, run_usu, fec_nac, correo, nombre_usu, clave) {
  let data = [numero_usu, nombre, apellido, run_usu, fec_nac, correo, nombre_usu, clave];
  return this.database.executeSql('INSERT INTO empleo (numero_usu, nombre, apellido, run_usu, fec_nac, correo, nombre_usu, clave) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', data)
    .then(_res => {
      this.buscarUsuarios();
    })
}


ingresar(nombre_usu, clave) {
  let data = [nombre_usu, clave];
  return this.database.executeSql('SELECT * FROM usuario WHERE nombre_usu = ? AND clave = ?', data)
    .then(res => {
      if (res.rows.length > 0) {
        this.isUserReady.next(true);
        this.usu_creado=1;
    }
      else {
        this.presentAlert("Usuario y/o Clave Incorrecta");
        this.isUserReady.next(false);
        this.usu_creado=0;
      }
  });

}

UserState() {
  return this.isUserReady.asObservable();
}

updateUsuario( numero_usu, nombre, apellido, run_usu, fec_nac, correo, nombre_usu, clave) {
  //this.presentAlert(titulo);
  let data = [numero_usu, nombre, apellido, run_usu, fec_nac, correo, nombre_usu, clave, run_usu];
  //this.presentAlert(id+"");
  return this.database.executeSql('UPDATE usuario SET numero_usu = ?, nombre = ?, apellido = ?, run_usu = ?, fec_nac = ?, correo = ?, nombre_usu = ?, clave = ?  WHERE run_usu = ?', data)
    .then(data => {
      //this.presentAlert("b");
      this.buscarUsuarios();
     // this.presentAlert("c");

    }) /*.catch(error => this.presentAlert(error.message));*/
    
}

deleteUsuario(run_usu) {
  return this.database.executeSql('DELETE FROM usuario WHERE run_usu = ?',[run_usu])
    .then(_ => {
      this.buscarUsuarios();
    });
}

  
 
 
  async presentAlert(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: mensaje,
      buttons: ['Ok']
    });

    await alert.present();
  }


}
