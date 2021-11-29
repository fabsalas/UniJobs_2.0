import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

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
 completar=false;
 stepOne:FormGroup;
 
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
completeStep(){
  this.completar=true;
}
}
