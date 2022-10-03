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
  imgURL : string = "https://image.shutterstock.com/image-vector/programming-code-coding-hacker-background-260nw-1714491562.jpg";

  constructor(private fb: FormBuilder, private service: CallApiService) { }

  ngOnInit(): void {
    this.formField();
    // this.getTableData();
  }

  formField() {
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
      "companyLogo": [this.imgURL],
      "aboutUs": ['']
    })
  }

  getTableData() {
    this.service.setHttp('get', 'api/CompanyRegistration/GetAllCompanies', false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.dataSource = res.responseData;
        console.log(res);
      }
    })
  }

  onSubmit() {
    let formValue = this.companyRegistrationForm.value;
    console.log(formValue);
    this.service.setHttp('post', 'api/CompanyRegistration', false, formValue, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.getTableData();

      }
    })
  }

  // onSubmit(){
  //   let formData = new FormData();
  //   formData.append('FolderName', 'example');
  //   formData.append('DocumentType','jpg,png,jpeg');
  //   formData.append('UploadDocPath',this.companyRegistrationForm.value.formField);

  //   this.service.setHttp('post','api/CompanyRegistration',false, formData, false, "baseURL");
  //   this.service.getHttp().subscribe({
  //     next:(res:any)=>{
  //       console.log(res);


  //       this.postApi();
  //     }
  //   })
  // }






}
