import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { AddSalaryTypeComponent } from '../../salary-type-registration/add-salary-type/add-salary-type.component';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {

  companyRegistrationForm !: FormGroup;
  dataSource = new Array();
  organizationArr = new Array();
  editFlag: boolean = false;
  fileURl: string = '';
  imgURL: string = '';
  selectedFile: any;
  selImg: string = '';

  @ViewChild('img') img!: ElementRef;

  profileImg: string = "../../../../../assets/images/user.jpg";

  constructor(private fb: FormBuilder, private service: CallApiService, 
    public dialogRef: MatDialogRef<AddSalaryTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar,
    private commonApi:CommonApiService, private error:HandelErrorService) { }

  ngOnInit(): void {
    this.formField();
    this.getOrganizationData();
    // console.log("Data : ",this.data);

    if (this.data) {
      this.onEdit();
      this.getOrganizationData();
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
      "organizationId": ['0', Validators.required],
      "companyName": ['', Validators.required],
      "contactNo": ['', [Validators.required, Validators.pattern("^[6-9]{1}[0-9]{9}"), Validators.maxLength(10), Validators.minLength(10)]],
      "address": ['', Validators.required],
      "website": ['', Validators.required],
      // "website": ['', [Validators.required, Validators.pattern("(www)\\.([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?")]],
      "emailId": ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      "companyLogo": ['', Validators.required],
      "aboutUs": ['', Validators.required]
    })
  }
  // ---------------------------------------- Form Field ---------------------------------------- //

  get f() {
    return this.companyRegistrationForm.controls;
  }

  // ---------------------------------- Organization dropdown ---------------------------------- //
  // getOrganizationData() {
  //   this.commonApi.getOrganization().subscribe({
  //     next: (response: any) => {
  //       debugger;
  //       if(response.statusCode == 200){
  //         this.organizationArr = response.responseData;
  //       }else{
  //         this.error.handelError(response.statusCode);
  //       }
  //     }
  //   }),(error: any) => {
  //     console.log(error)
  //       this.error.handelError(error.statusCode);
  //     }
  // }
  getOrganizationData() { // remove
    this.service.setHttp('get', 'api/CommonDropDown/GetOrganization', false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 && res.responseData.length ? (this.organizationArr = res.responseData) : this.organizationArr = [];
        // console.log(res);
      }, error: (error: any) => {
        console.log("Error : ", error);
        this.error.handelError(error.statusCode);
      }
    })
  }
  // ---------------------------------- Organization dropdown ---------------------------------- //

  // ------------------------------------- Edit Form ------------------------------------- //
  onEdit() {
    this.editFlag = true;
    let obj = this.data;
    // console.log(obj);
    this.companyRegistrationForm.patchValue({ // remove
      organizationId: obj.orgId,
      companyName: obj.companyName,
      contactNo: obj.contactNo,
      address: obj.address,
      website: obj.website,
      emailId: obj.emailId,
      companyLogo: obj.companyLogo,
      aboutUs: obj.aboutUs
    });
    this.profileImg = this.data?.companyLogo;
  }
  // ------------------------------------- Edit Form ------------------------------------- //

  // ------------------------------------- Image upload ------------------------------------- //
  selectImg() {  // remove
    this.img.nativeElement.click();
  }

  uploadImg(event: any) {  // common
    let finalValue = event.target.value;
    // console.log(" file selected:", finalValue);
    let extension = event.target.value.split('.')[1];
    extension = extension.toLowerCase();
    if (extension == 'jpg' || extension == 'png') {
      const file = event.target.files[0];
      // console.log(event);
      if (file.size > 1000000) {
        this.snackbar.open('Upload another Image', 'Ok');
        this.img.nativeElement.value = '';
        return
      }
      let readImg = new FileReader();
      readImg.onload = (event: any) => {
        this.profileImg = event.target.result;
        this.selImg = file;
      }
      readImg.readAsDataURL(file);
      this.companyRegistrationForm.value.companyLogo = file;
    }
    let formData = new FormData();
    formData.append('FolderName', 'D');
    formData.append('DocumentType', 'jpg, jpeg');
    formData.append('UploadDocPath', this.companyRegistrationForm.value.companyLogo);
    // console.log(formData);

    this.service.setHttp('post', 'HRMS/DocumentMaster/UploadFile', false, formData, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.imgURL = res.responseData;
          this.snackbar.open(res.statusMessage, 'Ok');
        }
      }, error: (error: any) => {
        console.log("Error : ", error);
        this.error.handelError(error.statusCode);
      }
    })
  }
  // ------------------------------------- Image upload ------------------------------------- //

  // ------------------------------------- Submit and Update ------------------------------------- //
  onSubmit() {
    let formValue = this.companyRegistrationForm.value;
    // console.log(formValue);
    formValue.companyName = formValue.companyName.trim();
    if (!this.editFlag) {  // remove
      formValue.companyLogo = this.imgURL;
      this.service.setHttp(!this.editFlag ? 'post' : 'put', 'api/CompanyRegistration', false, formValue, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          this.snackbar.open(res.statusMessage, 'Ok');
          console.log(" all data saved success,", res);
          this.dialogRef.close();
        }, error: (error: any) => {
          console.log("Error : ", error);
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
          this.snackbar.open(res.statusMessage, 'Ok');
          this.dialogRef.close();
        }, error: (error: any) => {
          console.log("Error : ", error);
          this.error.handelError(error.statusCode);
        }
      })
    }
  }

  clearForm() {
      this.companyRegistrationForm.controls['companyName'].setValue('');
      this.companyRegistrationForm.controls['contactNo'].setValue('');
      this.companyRegistrationForm.controls['address'].setValue('');
      this.companyRegistrationForm.controls['website'].setValue('');
      this.companyRegistrationForm.controls['emailId'].setValue('');
      this.companyRegistrationForm.controls['companyLogo'].setValue('');
      this.companyRegistrationForm.controls['aboutUs'].setValue('');
  }
  // ------------------------------------- Submit and Update ------------------------------------- //
}
