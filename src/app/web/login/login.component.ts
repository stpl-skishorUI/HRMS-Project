import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm !: FormGroup;
  userName : string='';
  password : any;
  constructor(private fb : FormBuilder, private apiService : CallApiService) { }

  ngOnInit(): void {
    this.formFeild();
  }

  formFeild(){
    this.loginForm = this.fb.group({
      userName : [''],
      password : ['']
    })

  }

  callApi(){
    this.apiService.setHttp('get','HRMS/UserLogin/GetList?UserName='+this.userName+'&Password='+this.password, false, false, false, "baseURL");
    
  }

  login(){
    let formValue = this.loginForm.value;
    console.log(formValue);
  }

}
