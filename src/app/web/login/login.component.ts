import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm !: FormGroup;
  constructor(private fb : FormBuilder, private apiService : CallApiService, private snackbar : MatSnackBar, private router : Router) { }

  ngOnInit(): void {
    this.formFeild();
  }

  formFeild(){
    this.loginForm = this.fb.group({
      userName : [''],
      password : ['']
    })
  }

  login(){
    let formValue = this.loginForm.value;
    console.log(formValue);
    
    this.apiService.setHttp('get','HRMS/UserLogin/GetList?UserName='+formValue.userName+'&Password='+formValue.password, false, false, false, "baseURL");
    this.apiService.getHttp().subscribe({
      next:(res:any)=>{
        if (res.statusCode == '200') {
          console.log(res);
          this.snackbar.open(res.statusMessage, 'Ok');
          this.router.navigateByUrl('/dashboard')
        }else if(res.statusCode == '409'){
          this.snackbar.open(res.statusMessage, 'Ok');
        }
      }, error:(error:any)=>{
        console.log(error);
        
      }
    })
  }


}
