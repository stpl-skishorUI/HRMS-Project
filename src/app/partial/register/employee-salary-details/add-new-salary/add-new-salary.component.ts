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
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<AddNewSalaryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.defaultForm();
    // this.getAllCompany();
    this.getAllEmployee();
    if(this.data){
      this.OnEdit(this.data);
    }

  }

  get f() { return this.emloyeeSalaryForm.controls }
  defaultForm() {

    this.emloyeeSalaryForm = this.fb.group({
      "id": this.data ? this.data.id :0,
        "empCode": ['',[Validators.required]],
        "salaryTypeId": 0,
        "companyId": ['',Validators.required],
        "effectiveDate": ['',[Validators.required]],
        "grossSalary": ['',[Validators.required]],
        "amount": 0,
        "yearId": 0,
        "createdBy": 0,
        "createdDate": new Date(),
        "isDeleted": true,
  })
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
   let obj = {
    ...this.emloyeeSalaryForm.value,
    "Salary":[{
      "empCode": 0,
      "salaryTypeId": 0,
      "effectiveDate":new Date(),
      "grossSalary": 0,
      "name":"string",
      "amount": 0,
      "yearId": 0,
      "createdBy": 0,
      "createdDate":new Date(),
      "isDeleted": true
    }]
   }
   if (this.editFlag){
    this.service.setHttp('put','/HRMS/EmployeeSalaryDetails/AddEmpSalaryDetails',false,obj,false,'baseURL');
    this.service.getHttp().subscribe({
      next :(res:any)=>{
        if(res.statusCode == 200){
          this.snack.open(res.statusMessage, "ok");
        }
      }
    })
   }else{
    this.service.setHttp('post','/HRMS/EmployeeSalaryDetails/AddEmpSalaryDetails',false,obj,false,'baseURL');
        this.service.getHttp().subscribe({
          naxt:(res:any)=>{
            if(res.statusCode == 200){
          this.snack.open(res.statusMessage,"ok");
        }
          }
        })
   }
   this.dialogRef.close();
    }
//------------------------------------------------------------------------OnEdit-------------------------------------------------------------------------------------//
OnEdit(obj:any){
  this.editFlag = true;
  this.emloyeeSalaryForm.patchValue({
    companyId: obj.companyId,
    createdBy: obj.createdBy,
    createdDate: new Date(),
    empCode: obj.name,
    grossSalary: obj.grossSalary,
    effectiveDate: obj.effectiveDate
  })
}

}



