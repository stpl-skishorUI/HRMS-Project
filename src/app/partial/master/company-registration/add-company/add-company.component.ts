import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyRegistrationForm !: FormGroup;
  dataSource = new Array();

  constructor(private fb : FormBuilder, private service : CallApiService) { }

  ngOnInit(): void {
    this.formField();
    // this.getTableData();
  }

  formField(){
    this.companyRegistrationForm = this.fb.group({
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": false,
        "id": 57,
        "organizationId": 0,
        "companyName": [''],
        "contactNo": [''],
        "address": [''],
        "website": [''],
        "emailId": [''],
        "companyLogo": [''],
        "aboutUs": ['']
    })
  }

  getTableData(){
    this.service.setHttp('get','CompanyRegistration/GetAllCompanies', false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next:(res:any)=>{
        this.dataSource = res.responseData;
        console.log(res);
      }
    })
  }

  onSubmit(){
    let formValue = this.companyRegistrationForm.value;
    console.log(formValue);
    this.service.setHttp('post','CompanyRegistration',false, formValue, false, "baseURL");
    this.service.getHttp().subscribe({
      next:(res:any)=>{
  this.getTableData();
       
      }
    })
  }



  
  

}
