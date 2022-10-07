import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  organizationArr = new Array();
  editFlag: boolean = false;
  fileURl: string = '';
  imgURL: string = '';
  selectedFile: any;
  selImg:string='';

  @ViewChild('img') img!: ElementRef;

  profileImg : string = "../../../../../assets/images/user.jpg";

  constructor(private fb: FormBuilder, private service: CallApiService, public dialogRef: MatDialogRef<AddSalaryTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snackbar: MatSnackBar) { }

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
      "companyName": ['',Validators.required] ,
      "contactNo": ['',[Validators.required, Validators.pattern("^[6-9]{2}[0-9]{8}")]],
      "address": ['', Validators.required],
      "website": ['',Validators.required],
      "emailId": ['', Validators.required],
      "companyLogo": ['', Validators.required],
      "aboutUs": ['', Validators.required]
    })
  }
  // ---------------------------------------- Form Field ---------------------------------------- //

  get f() {
    return this.companyRegistrationForm.controls;
  }

  // ---------------------------------- Organization dropdown ---------------------------------- //
  getOrganizationData() {
    this.service.setHttp('get', 'api/CommonDropDown/GetOrganization', false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.organizationArr = res.responseData;
        // console.log(res);
      }
    })
  }
  // ---------------------------------- Organization dropdown ---------------------------------- //

  // ------------------------------------- Edit Form ------------------------------------- //
  onEdit() {
    this.editFlag = true;
    let obj = this.data;

    // console.log(obj);
    
    this.companyRegistrationForm.patchValue({
      // "createdBy": 0,
      // "modifiedBy": 0,
      // createdDate: new Date(),
      // modifiedDate: new Date(),
      // isDeleted: false,
      // id: obj.id,
      organizationId: obj.orgId,
      companyName: obj.companyName,
      contactNo: obj.contactNo,
      address: obj.address,
      website: obj.website,
      emailId: obj.emailId,
      companyLogo: obj.companyLogo,
      aboutUs: obj.aboutUs
    });
    // this.selectedFile = obj.companyLogo;
    this.profileImg = this.data?.companyLogo;
  }
  // ------------------------------------- Edit Form ------------------------------------- //

  // ------------------------------------- Image upload ------------------------------------- //
  selectImg() {
    this.img.nativeElement.click();
  }

  uploadImg(event: any) {
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
      }
    })
  }
  // ------------------------------------- Image upload ------------------------------------- //

  // ------------------------------------- Submit and Update ------------------------------------- //
  onSubmit() {
    let formValue = this.companyRegistrationForm.value;
    console.log(formValue);

    if (!this.editFlag) {
      formValue.companyLogo = this.imgURL;
      this.service.setHttp('post', 'api/CompanyRegistration', false, formValue, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          this.snackbar.open(res.statusMessage, 'Ok');
        }
      })
    }
    else {
      // let editValue = this.companyRegistrationForm.value;

      this.service.setHttp('put', 'api/CompanyRegistration', false, formValue, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          this.snackbar.open(res.statusMessage, 'Ok');
        }
      })
    }
  }

 

  clearForm(event: any) {
    if (event.value == this.companyRegistrationForm.value.organizationId) {
      this.companyRegistrationForm.controls['companyName'].setValue('');
      this.companyRegistrationForm.controls['contactNo'].setValue('');
      this.companyRegistrationForm.controls['address'].setValue('');
      this.companyRegistrationForm.controls['website'].setValue('');
      this.companyRegistrationForm.controls['emailId'].setValue('');
      this.companyRegistrationForm.controls['companyLogo'].setValue('');
      this.companyRegistrationForm.controls['aboutUs'].setValue('');
    }

  }


  // ------------------------------------- Submit and Update ------------------------------------- //
}
