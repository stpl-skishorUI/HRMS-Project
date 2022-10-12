import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';
import { AddSalaryTypeComponent } from '../../salary-type-registration/add-salary-type/add-salary-type.component';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  companyRegistrationForm !: FormGroup;
  organizationArr = new Array();
  editFlag: boolean = false;
  imgURL: string = '';
  img: any;

  // @ViewChild('img') img!: ElementRef;

  profileImg: string = "../../../../../assets/images/user.jpg";

  constructor(private fb: FormBuilder, private service: CallApiService,
    public dialogRef: MatDialogRef<AddSalaryTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar,
    private commonApi: CommonApiService, private error: HandelErrorService,
    public validationService: ValidationPatternService
  ) { }

  ngOnInit(): void {
    this.formField();
    this.getOrganizationData();

    if (this.data) {
      this.onEdit();
    }
  }
  // ---------------------------------------- Form Field ---------------------------------------- //
  formField() {
    this.companyRegistrationForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": true,
      "id": this.data ? this.data.id : 0,
      "organizationId": [this.data ? this.data.orgId : '', Validators.required],
      "companyName": [this.data ? this.data.companyName : '', Validators.required],
      "contactNo": [this.data ? this.data.contactNo : '', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}"), Validators.maxLength(10), Validators.minLength(10)]],
      "address": [this.data ? this.data.address : '', Validators.required],
      // "website": [this.data ? this.data.website :  '', [Validators.required, Validators.required, Validators.pattern("(www)\\.([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
      "website": [this.data ? this.data.website : '', [Validators.required, Validators.required]],
      "emailId": [this.data ? this.data.emailId : '', [Validators.required, Validators.pattern("^[a-zA-Z0-9._%+-]+@([a-z0-9.-]+[.])+[a-z]{2,5}$")]],
      "companyLogo": [this.data ? this.data.companyLogo : ''],
      "aboutUs": [this.data ? this.data.aboutUs : '', Validators.required]
    })
  }
  // ---------------------------------------- Form Field ---------------------------------------- //

  // -------------------------------------- Form Controls -------------------------------------- //
  get f() {
    return this.companyRegistrationForm.controls;
  }
  // -------------------------------------- Form Controls -------------------------------------- //

  // ---------------------------------- Organization dropdown ---------------------------------- //
  getOrganizationData() {
    this.commonApi.getOrganization().subscribe({
      next: (response: any) => {
        if (response.statusCode == 200) {
          this.organizationArr = response.responseData;
        } else {
          this.error.handelError(response.statusCode);
        }
      }
    })
  }
  // ---------------------------------- Organization dropdown ---------------------------------- //

  // ------------------------------------- Submit and Update ------------------------------------- //
  onSubmit() {
    let formValue = this.companyRegistrationForm.value;
    formValue.companyName = formValue.companyName.trim();
    if (!formValue.companyName.replace(/\s/g, '').length){ 
      return;
    }else if(!formValue.address.replace(/\s/g, '').length){
      return;
    }else if( !formValue.website.replace(/\s/g, '').length){
      return;
    }else if(!formValue.emailId.replace(/\s/g, '').length){
      return;
    }else if(!formValue.address.replace(/\s/g, '').length){
      return;
    }else if(!formValue.aboutUs.replace(/\s/g, '').length){
      return;
    }else{
    if (!this.editFlag) {  // remove
      // if(formValue.companyLogo == ''){
      //   return;
      // }
      formValue.companyLogo = this.imgURL;
      this.service.setHttp(!this.editFlag ? 'post' : 'put', 'api/CompanyRegistration', false, formValue, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            this.snackbar.open(res.statusMessage, 'Ok');
            // console.log(" all data saved success,", res);
            this.dialogRef.close('yes');
          }
        }, error: (error: any) => {
          // console.log("Error : ", error);
          this.error.handelError(error.statusCode);
        }
      })
    }
    else {
      if (formValue.companyLogo == this.data.companyLogo) {
        formValue.companyLogo = this.data.companyLogo;
      } else {
        formValue.companyLogo = this.imgURL;
      }
      this.service.setHttp('put', 'api/CompanyRegistration', false, formValue, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == 200) {
            this.snackbar.open(res.statusMessage, 'Ok');
            this.dialogRef.close('yes');
          }
        }, error: (error: any) => {
          // console.log("Error : ", error);
          this.error.handelError(error.statusCode);
        }
      })
    }
  }
  }
  // ------------------------------------- Submit and Update ------------------------------------- //

  // ------------------------------------- Image upload ------------------------------------- //
  uploadImg(event: any) {  // common
    let extension = event.target.value.split('.')[1];
    extension = extension.toLowerCase();
    if (extension == 'jpg' || extension == 'png') {
      const file = event.target.files[0];
      if (file.size > 1000000) {
        this.snackbar.open('Upload another Image', 'Ok');
        this.img.nativeElement.value = '';
        return
      }
      let readImg = new FileReader();
      readImg.onload = (event: any) => {
        this.profileImg = event.target.result;
        // this.selImg = file;
      }
      readImg.readAsDataURL(file);
      this.companyRegistrationForm.value.companyLogo = file;
    }
    let formData = new FormData();
    formData.append('FolderName', 'D');
    formData.append('DocumentType', 'jpg, jpeg');
    formData.append('UploadDocPath', this.companyRegistrationForm.value.companyLogo);

    this.service.setHttp('post', 'HRMS/DocumentMaster/UploadFile', false, formData, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.imgURL = res.responseData;
          this.snackbar.open(res.statusMessage, 'Ok');
        }
      }, error: (error: any) => {
        // console.log("Error : ", error);
        this.error.handelError(error.statusCode);
      }
    })
  }
  // ------------------------------------- Image upload ------------------------------------- //

  // ------------------------------------- Edit Form ------------------------------------- //
  onEdit() {
    this.editFlag = true;
    // this.editObj = this.data;
    this.formField();

    this.profileImg = this.data ? this.data.companyLogo : '';
  }
  // ------------------------------------- Edit Form ------------------------------------- //

  // ------------------------------- Clear form feild if Organization changed ------------------------------- //
  clearForm() {
    this.companyRegistrationForm.controls['companyName'].setValue('');
    this.companyRegistrationForm.controls['contactNo'].setValue('');
    this.companyRegistrationForm.controls['address'].setValue('');
    this.companyRegistrationForm.controls['website'].setValue('');
    this.companyRegistrationForm.controls['emailId'].setValue('');
    this.companyRegistrationForm.controls['companyLogo'].setValue('');
    this.companyRegistrationForm.controls['aboutUs'].setValue('');
  }
  // ------------------------------- Clear form feild if Organization changed ------------------------------- //
}
