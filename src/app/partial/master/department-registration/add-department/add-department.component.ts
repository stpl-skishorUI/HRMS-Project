import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentRegistrationComponent } from '../department-registration.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  deptRegistrationForm!: FormGroup;
  displayCompanyDropdown = new Array();
  editFlag: boolean = false;

  constructor(private service: CallApiService, private fb: FormBuilder, public dialog: MatDialog,  private snack: MatSnackBar, public dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.controlForm();
    this.getCompanyData();
    if(this.data){
      this.onEdit(this.data);
    }
  }

  get f() { return this.deptRegistrationForm.controls }
//-----------------------------------------------------------------------------Form Start-----------------------------------------------------------------------//
  controlForm() {
    this.deptRegistrationForm = this.fb.group({
      "id": this.data ? this.data.id : 0,
      "companyId": ['',Validators.required],
      "departmentName": ['',Validators.required],
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": "2022-10-10T05:56:55.007Z",
      "modifiedDate": "2022-10-10T05:56:55.007Z",
      "isDeleted": true,

    })

  }


  // --------------------------------------------------------------- Department Dropdown ------------------------------------------
  getCompanyData() {
    this.service.setHttp('get', 'api/CommonDropDown/GetCompany', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.displayCompanyDropdown = res.responseData;
        }
      }
    })
  }
//---------------------------------------------------------------for Validation---------------------------------------------------------------------------//
public hasError = (controlName: string, errorName: string) => {
  return this.deptRegistrationForm.controls[controlName].hasError(errorName);
}

  // ------------------------------------------------------------------------ Post api -------------------------------------------------------------------------//
  postData() {
    let obj = {
      ...this.deptRegistrationForm.value,
      "Department":[{
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": 0,
        "companyId": 0,
        "departmentName": "string"
      }]
    }
    if (this.editFlag){
    this.service.setHttp('put', 'HRMS/DepartmentType',false,obj,false,'baseURL'),
    this.service.getHttp().subscribe({
      next: (res:any)=>{
        if(res.statusCode == 200){
          this.snack.open(res.statusMessage, "ok");
        }
      }
    })
  }
  else{
this.service.setHttp('post','HRMS/DepartmentType',false,obj,false,'baseURL');
this.service.getHttp().subscribe({
  next: (res:any)=>{
    if (res.statusCode == 200){
      this.snack.open(res.statusMessage,"ok");
    }
  }
})
  }
  this.dialogRef.close();
  }
//-------------------------------------------------------------------------cancle--------------------------------------------------------------------------

onCancel(){
  this.editFlag = false;
}

//---------------------------------------------------------------------------Patch Value----------------------------------------------------------------------------------//

 onEdit(obj: any) {
  this.editFlag = true;
  this.deptRegistrationForm.patchValue({
    companyId: obj.companyId,
    createdBy: obj.createdBy,
    createdDate: new Date(),
    departmentName: obj.departmentName,
  })

}

}
