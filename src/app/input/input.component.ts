import { Component } from '@angular/core';

import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {


  // loginForm=new FormGroup({
  //   user:new FormControl('',Validators.required),
  //   email:new FormControl('',[Validators.required,Validators.email])

  // })
  // userlogin(){
  //   console.log(this.loginForm.value)
  // }

  // get user(){
  //   return this.loginForm.get('user')
  // }
  // get email(){
  //   return this.loginForm.get('email')
  // }
}



