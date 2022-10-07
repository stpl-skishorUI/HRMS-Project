import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';

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
  // imageURL:string="../../../../../assets/images/user.jpg";
  imageURL: any;
  // @ViewChild('img') img!: ElementRef;
  img: any;
  constructor(private service: CallApiService, private fb: FormBuilder, private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { this.data1 = data }

  ngOnInit(): void {
    // this.imageURL ? this.data?.orgLogo : "/assets/images/user.jpg";
    console.log("Image Loaded", this.data);
    this.formData();
  }

  formData() {
    console.log(" form valuee selectedd:",this.data1 );
    this.data ? this.editFlag = true : ''
    this.OrganizationRegForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      id: this.editFlag ? this.data1.id : 0,
      orgName: this.editFlag ? this.data1.orgName : "",
      contactNo: this.editFlag ? this.data1.contactNo : "",
      address: this.editFlag ? this.data1.address : "",
      website: this.editFlag ? this.data1.website : "",
      emailId: this.editFlag ? this.data1.emailId : "",
      orgLogo: this.editFlag ? this.data1.orgLogo : "",
      aboutUs: this.editFlag ? this.data1.aboutUs : ""
    });
    this.imageURL = this.editFlag? this.data1.orgLogo : "/assets/images/user.jpg";
  }
  //************************Start Submit Logic Here**********************/
  onSubmit() {
    let data = this.OrganizationRegForm.value;
    this.imageURL = data.orgLogo;
    // data.orgLogo = this.imageURL;
    console.log(data);
    if (!this.editFlag) {
      this.service.setHttp('post', 'HRMS/Orgnization/SaveOrg', false, data, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200') {
            this.snackbar.open(res.statusMessage, 'ok');
            // this.bindTable();
          }
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
            // this.profileImg = res.orgLogo;
          }
        }
      })
    }
  }
  //************************End Submit Logic Here**********************/

  //***************************Start Upload Img*******************************/
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
        this.fileURl = event.target.result;
      }
      readImg.readAsDataURL(file);
      this.OrganizationRegForm.value.orgLogo = file;
    }
    let formData = new FormData();
    formData.append('FolderName', 'D');
    formData.append('DocumentType', 'png,jpg');//set default extension if you required
    formData.append('UploadDocPath', this.OrganizationRegForm.value.orgLogo);
    console.log(this.formData);
    this.service.setHttp('post', 'HRMS/DocumentMaster/UploadFile', false, formData, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        console.log("*********************", res);
        this.imageURL = res.responseData;
        if (res.statusCode == 200) {
          // this.imageURL = res.responseData;
          this.snackbar.open(res.statusMessage, 'Ok');
        }
      }
    })
  }
  //*************************End Upload Img*************************************** */
}