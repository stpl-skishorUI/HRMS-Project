import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-add-new-salary',
  templateUrl: './add-new-salary.component.html',
  styleUrls: ['./add-new-salary.component.scss'],
})
export class AddNewSalaryComponent implements OnInit {
  emloyeeSalaryForm!: FormGroup;
  company :any;
  employee :any;
  editFlag: boolean = false;
  constructor(
    private service: CallApiService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddNewSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.defaultForm();
    this.getAllCompany();
    this.getAllEmployee();

  }

  defaultForm() {
    let  editData = this.data;
    this.emloyeeSalaryForm = this.fb.group({

        "empCode": 0,
        "salaryTypeId": 0,
        "effectiveDate": new Date(),
        "amount": 0,
        "yearId": 0,
        "createdBy": 0,
        "createdDate": new Date(),
        "isDeleted": true,

      companyId: [editData ? editData.companyId : ''],
      allemployee: [editData ? editData.allemployee : ''],
      datepicker: [editData ? editData.datepicker : ''],
    });
  }

  //------------------------------------------------------------------------AllCompany--------------------------------------------------------------------------------
  getAllCompany() {
    this.service.setHttp(
      'get',
      'api/CommonDropDown/GetCompany',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.company = res.responseData;
        }
      },
    });
  }

  //------------------------------------------------------------------------AllEmployee--------------------------------------------------------------------------------
  getAllEmployee() {
    this.service.setHttp(
      'get',
      'api/CommonDropDown/GetEmployee',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.employee = res.responseData;
        }
      },
    });
  }

  //--------------------------------------------------------------------------Cancle--------------------------------------------------------------------------------
  onCancel() {
    this.editFlag = false;
  }
  //----------------------------------------------------------SubmitForm------------------------------------------------------
  SubmitForm() {
    if(this.editFlag){
      let obj = this.emloyeeSalaryForm.value;
      this.service.setHttp(
        this.editFlag ? 'put' : 'post',
        'HRMS/EmployeeSalaryDetails/AddEmpSalaryDetails?EmpCode=',
        false,
        obj,
        false,
        'baseURL'
      );
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200') {
            this.emloyeeSalaryForm.reset();
          }
        },
      });
    }
    }

}
