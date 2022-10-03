import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddSalaryTypeComponent } from '../../salary-type-registration/add-salary-type/add-salary-type.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyRegistrationForm !: FormGroup;
  dataSource = new Array();
  // imgURL : string = "https://image.shutterstock.com/image-vector/programming-code-coding-hacker-background-260nw-1714491562.jpg";
  organizationArr = new Array();
  editFlag : boolean = false;

  @ViewChild('img') img !: string;

  constructor(private fb: FormBuilder, private service: CallApiService, public dialogRef: MatDialogRef<AddSalaryTypeComponent>, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
    this.formField();
    this.getOrganizationData();
    this.getTableData();
  
    if(this.editFlag){
      this.onEdit(this.data);
    }

  }

  formField() {
    this.companyRegistrationForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": true,
      "id": 0,
      "organizationId": [''],
      "companyName": [''],
      "contactNo": [''],
      "address": [''],
      "website": [''],
      "emailId": [''],
      "companyLogo": [''],
      "aboutUs": ['']
    })
  }

  getTableData() {
    this.service.setHttp('get', 'api/CompanyRegistration/GetAllCompanies', false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        // console.log(res);
        this.dataSource = res.responseData;
      
      }
    })
  }

  getOrganizationData(){
    this.service.setHttp('get','api/CommonDropDown/GetOrganization', false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next:(res:any)=>{
        this.organizationArr = res.responseData;
        // console.log(res);
      }
    })
  }

  onSubmit() {
    if(!this.editFlag){
      let formValue = this.companyRegistrationForm.value;
    // console.log(formValue);
    this.service.setHttp('post','api/CompanyRegistration', false, formValue, false, 'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.getTableData();
      }
    })
    }
    else{
      let editValue = this.companyRegistrationForm.value;
      this.service.setHttp('put','api/CompanyRegistration', false, editValue, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res:any)=>{
          this.getTableData();
        }
      })
    }
  }

  onEdit(obj:any){
    this.editFlag = true;
    this.companyRegistrationForm.patchValue({
      // "createdBy": 0,
      // "modifiedBy": 0,
      createdDate: new Date(),
      modifiedDate: new Date(),
      isDeleted: true,
      id: obj.id,
      organizationId: obj.organizationId,
      companyName: obj.companyName,
      contactNo: obj.contactNo,
      address: obj.address,
      website: obj.website,
      emailId: obj.emailId,
      companyLogo: obj.companyLogo,
      aboutUs: obj.aboutUs
    })
  }

  // uploadImg(event:any, flag: string){
  //   // let name = event.target.value.split('.')[0];
  //   console.log(event);
  //   let formImg = new FormData();
  //   this.service.setHttp('post','HRMS/DocumentMaster/UploadFile', false, formImg, false, 'baseURL');
  //   this.service.getHttp().subscribe({
  //     next: (res:any)=>{
  //       // console.log(res);
  //       if(res.statusCode == 200){
  //         this.onSubmit();
  //       }
  //     }
  //   })
  // }

  uploadImg(){
    let formData = new FormData();
    formData.append('FolderName', 'example');
    formData.append('DocumentType','jpg,png,jpeg');
    formData.append('UploadDocPath',this.companyRegistrationForm.value.formField.companyLogo);

    this.service.setHttp('post','HRMS/DocumentMaster/UploadFile',false, formData, false, "baseURL");
    this.service.getHttp().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.onSubmit();
      }
    })
  }

  
}
