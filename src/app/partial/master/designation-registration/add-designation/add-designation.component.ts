import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log("edit data", this.data);

    this.formData();
    this.getCompanyDropdown();
    if (this.data) {
      this.onEdit(this.data);
    }
  }

  get f() { return this.designationForm.controls }

  formData() {
    this.designationForm = this.formBuilder.group({
      "id": this.data ? this.data.id : 0,
      "companyId": [0,Validators.required],
      "departmentId":[0,Validators.required],
      "designationName": ['',Validators.required],
      "organizationId": 0,
      "year": 0,
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date,
      "modifiedDate": new Date,
      "isDeleted": true,
      "createdDateFormatdate": [''],
      "modifiedDateFormatdate": new Date
    })
  }

  //-----------------------------------Drop-Down------------------------------------------//
  getCompanyDropdown() {
    // let orgId=this.designationForm.value.organizationId;
   
    
    this.service.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId=0', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        console.log("company", res);
        if (res.statusCode == 200 && res.responseData.length) {
          this.companyData = res.responseData;
          this.editFlag ?  this.getDepartmentDropdown() : '';
        }
      }
    })
  }
  getDepartmentDropdown() {
    let comId=this.designationForm.value.companyId;
    this.service.setHttp('get', 'api/CommonDropDown/GetDepartment?CompanyId='+comId, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        console.log("department", res);
        if (res.statusCode == 200 && res.responseData.length) {
          this.departmentData = res.responseData;
        }
      }
    })
  }
  //-----------------------------------Drop-Down------------------------------------------//

  //-----------------------------------Patch Value------------------------------------------//
  onEdit(obj: any) {
    console.log("objId", obj.id);
    this.editFlag = true;
    this.designationForm.patchValue({
      companyId: obj.companyId,
      createdBy: obj.createdBy,
      createdDate: new Date(),
      createdDateFormatdate: new Date(),
      departmentId: obj.departmentId,
      designationName: obj.designationName,
      // id: this.editFlag ? +obj.id : 0
    })
    this.getCompanyDropdown();

  }
  //-----------------------------------Patch Value------------------------------------------//
  OnSubmit() {
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
    if (this.editFlag) {
      this.service.setHttp('put', 'HRMS/Designation', false, obj, false,
        'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == 200 && res.responseData.length) {
            this.snack.open(res.statusMessage, "ok");
            // this.dialogRef.close();
          }
        }
      })
    }
    else {
      this.service.setHttp('post', 'HRMS/Designation', false, obj, false,
        'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == 200 && res.responseData.length) {
            this.snack.open(res.statusMessage, "ok");
            // this.dialogRef.close();
          }
        }
      })
    }
     this.dialogRef.close();
  }
}
