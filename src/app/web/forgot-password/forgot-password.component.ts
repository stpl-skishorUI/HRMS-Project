import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  hide = true;
  forgotForm !: FormGroup;
  otpScreen : boolean = true;
  passwordScreen : boolean = false;

  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.formField();
  }

  formField(){
    this.forgotForm = this.fb.group({
      mobileNumber : [''],
      otp : [''],
      password : [''],
      confirmPassword : ['']
    })
  }

  save(){
    this.passwordScreen = true;
    this.otpScreen = false;
  }





}
