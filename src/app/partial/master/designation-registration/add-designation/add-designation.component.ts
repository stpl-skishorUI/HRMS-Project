import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CommonApiService } from 'src/app/core/services/common-api.service';

@Component({
  selector: 'app-add-designation',
  templateUrl: './add-designation.component.html',
  styleUrls: ['./add-designation.component.scss']
})
export class AddDesignationComponent implements OnInit {
  designationForm!: FormGroup;
  companyData: any[] = [];
  departmentData: any[] = [];
  editFlag: boolean = false;

  constructor(private formBuilder: FormBuilder, private service: CallApiService, private snack: MatSnackBar,
    public dialogRef: MatDialogRef<AddDesignationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private commomApi:CommonApiService) { }

  ngOnInit(): void {
    this.formData();
    this.getCompanyDropdown();
    this.data ? this.onEdit(this.data) : '';
  }

  get f() { return this.designationForm.controls }

  formData() {
    this.designationForm = this.formBuilder.group({
      "id": this.data ? this.data.id : 0,
      "companyId": ['', Validators.required],
      "departmentId": ['', Validators.required],
      "designationName": ['', [Validators.required,Validators.minLength(3)]],
      "organizationId": 0,
      "year": 0,
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date,
      "modifiedDate": new Date,
      "isDeleted": true,
      "createdDateFormatdate": ['',Validators.required],
      "modifiedDateFormatdate": new Date
    })
  }

  //-----------------------------------Drop-Down------------------------------------------//
  getCompanyDropdown() {   
    let orgId=this.designationForm.value.organizationId;
    this.commomApi.getCompanies(orgId).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.companyData = res.responseData;
          this.editFlag ? this.getDepartmentDropdown() : '';
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }
  
  getDepartmentDropdown() {
    let comId = this.designationForm.value.companyId;   
    this.commomApi.getDeptByCompanyId(comId).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.departmentData = res.responseData;
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }
  //-----------------------------------Drop-Down------------------------------------------//

  //-----------------------------------Patch Value----------------------------------------//
  onEdit(obj: any) {
    this.editFlag = true;
    this.designationForm.patchValue({
      companyId: obj.companyId,
      createdBy: obj.createdBy,
      createdDate: new Date(),
      createdDateFormatdate: new Date(),
      departmentId: obj.departmentId,
      designationName: obj.designationName
    })
    this.getCompanyDropdown();
  }
  //-----------------------------------Patch Value--------------------------------------//
  //-----------------------------------Submit------------------------------------------//
  OnSubmit() {
    if(this.designationForm.valid){
      let obj = {
        ...this.designationForm.value,
        "leaveTypes": [
          {
            "createdBy": 0,
            "modifiedBy": 0,
            "createdDate": new Date,
            "modifiedDate": new Date,
            "isDeleted": true,
            "id": 0,
            "companyId": 0,
            "departmentId": 0,
            "designationId": 0,
            "leaveName": "string",
            "leaveQty": 0,
            "isHalfDay": true
          }
        ]
      }
     
        this.service.setHttp(this.editFlag?'put':'post', 'HRMS/Designation', false, obj, false,
          'baseURL');
        this.service.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == 200) {
              this.dialogRef.close();
              this.snack.open(res.statusMessage, "ok");              
            }
          }, error: (error: any) => {
            console.log("Error : ", error);
          }
        })   
    }
   
  }
  //-----------------------------------Submit------------------------------------------//
  //-----------------------------------Clear-Form--------------------------------------//
  clearForm(formControlName: any) {
    if (formControlName == 'companyId') {
      this.designationForm.controls['departmentId'].setValue('');
      this.designationForm.controls['designationName'].setValue('');
      this.designationForm.controls['createdDateFormatdate'].setValue('');
    } else if (formControlName == 'departmentId') {
      this.designationForm.controls['designationName'].setValue('');
      this.designationForm.controls['createdDateFormatdate'].setValue('');
    } else if (formControlName == 'designationName') {
      this.designationForm.controls['createdDateFormatdate'].setValue('');
    }
  }
  //-----------------------------------Clear-Form------------------------------------------//
}
