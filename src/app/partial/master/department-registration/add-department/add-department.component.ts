import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DepartmentRegistrationComponent } from '../department-registration.component';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss']
})
export class AddDepartmentComponent implements OnInit {
  deptRegistrationForm!: FormGroup;
  displayCompanyDropdown = new Array();
  editFlag: boolean = false;

  constructor(private service: CallApiService, private fb: FormBuilder, public dialog: MatDialog, public dialogRef: MatDialogRef<AddDepartmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.controlForm();
    this.getCompanyData();
  }

  controlForm() {

    let editData = this.data;

    this.deptRegistrationForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      createdDate: new Date(),
      // "modifiedDate": "2022-10-03T04:58:21.680Z",
      "isDeleted": true,
      // "id": 0,
      companyId: [editData ? editData.id : ''],
      departmentName: [editData ? editData.departmentName : '']
    })
    this.getCompanyData();

    if(editData){
      this.editFlag = true;
    }
  }

  // --------------------------------------- Department Dropdown ------------------------------------------
  getCompanyData() {
    this.service.setHttp('get', 'api/CommonDropDown/GetCompany', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res.statusCode == '200') {
          this.displayCompanyDropdown = res.responseData;
        }
      }
    })
  }

  // --------------------------------------- Post api -----------------------------------------------------
  postData() {
    if (!this.editFlag) {
      let obj = this.deptRegistrationForm.value;
      this.service.setHttp('post', 'api/DepartmentType', false, obj, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200'){
            this.deptRegistrationForm.reset();
          }
        }
      })
    }
    else{
      let obj1 = this.deptRegistrationForm.value;

      let updateData = {
        "createdBy": 0,
        "modifiedBy": 0,
        // "createdDate": new Date(),
        modifiedDate: new Date(),
        "isDeleted": true,
        // "id": 0,
        companyId: obj1.companyId,
        departmentName: obj1.departmentName
      }
      this.service.setHttp('put', 'api/DepartmentType', false, updateData, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200'){
            this.deptRegistrationForm.reset(); 
          }
        }
      })
    }
  }

}
