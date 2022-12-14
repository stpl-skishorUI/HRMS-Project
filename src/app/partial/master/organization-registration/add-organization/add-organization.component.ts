import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';
import { OrganizationRegistrationComponent } from '../organization-registration.component';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.scss']
})
export class AddOrganizationComponent implements OnInit {
  OrganizationRegForm!: FormGroup;
  editFlag: boolean = false;
  data1: any;
  fileURl: any;
  imageURL: any;
  img: any;
  constructor(private service: CallApiService, private fb: FormBuilder, private snackbar: MatSnackBar,
    private dialogRef:MatDialogRef<AddOrganizationComponent>,
    private error:HandelErrorService,@Inject(MAT_DIALOG_DATA) public data: any,public validationservice:ValidationPatternService) { this.data1 = data }
  ngOnInit(): void {
    this.formData();
  }
  //***************************Form Field************************************ */
  formData() {
    this.data ? this.editFlag = true : ''
    this.OrganizationRegForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      id: this.editFlag ? this.data.id : 0,
      orgName: [this.editFlag ? this.data.orgName : '', Validators.required],
      contactNo: [this.editFlag ? this.data.contactNo : '', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}$")]],
      address: [this.editFlag ? this.data.address : '', Validators.required],
      website: [this.editFlag ? this.data.website : '', Validators.required],
      emailId: [this.editFlag ? this.data.emailId : '', [Validators.required, Validators.email]],
      orgLogo: [this.editFlag ? this.data.orgLogo : ''],
      aboutUs: [this.editFlag ? this.data.aboutUs : '', Validators.required],
    });
    this.imageURL = this.editFlag ? this.data.orgLogo : "/assets/images/user.jpg";//if no img add then default img set 
  }
  //***************************Form Field************************************ */
  //********************for Validation Handle*************************/
  get f() {
    return this.OrganizationRegForm.controls;
  }
  //***************************Start Upload Img*******************************/
  selectImg() {
    this.img.nativeElement.click();
  }

  uploadImg(event: any) {
    let finalValue = event.target.value;
    let extension = event.target.value.split('.')[1];
    extension = extension.toLowerCase();
    if (extension == 'jpg' || extension == 'png'  || extension == 'jpeg') {
      const file = event.target.files[0];
      if (file.size > 1000000) {
        this.snackbar.open('Upload another Image', 'Ok');
        this.img.nativeElement.value = '';
        return
      }
      let readImg = new FileReader();
      readImg.onload = (event: any) => {
        this.fileURl = event.target.result;
      }
      readImg.readAsDataURL(file);
      this.OrganizationRegForm.value.orgLogo = file;
    }
    let formData = new FormData();
    formData.append('FolderName', 'D');
    formData.append('DocumentType', 'png,jpg,jpeg');//set default extension if you required
    formData.append('UploadDocPath', this.OrganizationRegForm.value.orgLogo);
    this.service.setHttp('post', 'HRMS/DocumentMaster/UploadFile', false, formData, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.imageURL = res.responseData;
        if (res.statusCode == 200) {
          // this.imageURL = res.responseData;
          this.snackbar.open(res.statusMessage, 'Ok');
          }
      }, error: (error: any) => {
        // console.log("Error : ", error);
        this.error.handelError(error.statusCode);
      }
    })
  }
  //*************************End Upload Img*************************************** */
  //************************Start Submit Logic Here**********************/
  onSubmit() {
    let data = this.OrganizationRegForm.value;
    data.orgLogo = this.imageURL;
    if(!data.orgName.replace(/\s/g, '').length || !data.address.replace(/\s/g, '').length || !data.aboutUs.replace(/\s/g, '').length){
     //if I pass empty fields the form will not be added
      return;
    }
    else{
    data.orgName.trim();//remove extra whitespace 
    if (!this.editFlag) {
      this.service.setHttp('post', 'HRMS/Orgnization/SaveOrg', false, data, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200') {
            this.snackbar.open(res.statusMessage, 'ok');
            this.dialogRef.close('Yes');
            //location.reload();//without click on refresh button add record
          }
        },
         error: (error: any) => {
          // console.log("Error : ", error);
          this.error.handelError(error.statusCode);
        }
      })
    }
    else {
      this.editFlag = true;
      this.service.setHttp('put', 'HRMS/Orgnization/UpdateOrg', false, data, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200') {
            this.snackbar.open(res.statusMessage, 'ok');
            this.imageURL = res.orgLogo;
            this.dialogRef.close('Yes');
          //  location.reload();
          }
        },
        error: (error: any) => {
          // console.log("Error : ", error);
          this.error.handelError(error.statusCode);
        }
      })
    }
  }
}
  //************************End Submit Logic Here**********************/
}