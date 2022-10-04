import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-salary-type',
  templateUrl: './add-salary-type.component.html',
  styleUrls: ['./add-salary-type.component.scss']
})
export class AddSalaryTypeComponent implements OnInit {
  companyDropDownArray = new Array();
  isPercentageArray = [{ id: 0, name: 'Yes' }, { id: 1, name: 'No' }];
  salaryForm!: FormGroup;
  editFlag: boolean = false;
  constructor(private service: CallApiService, private fb: FormBuilder, public dialogRef: MatDialogRef<AddSalaryTypeComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getFormData();
    this.getCompanyNameDropdown();
    if (this.data) {
      this.OnEdit(this.data);
    }
  }
  //--------------------------------------------------------------- dropDown Starts---------------------------------------------
  getCompanyNameDropdown() {
    this.service.setHttp('get', 'api/CommonDropDown/GetCompany', false, false, false, 'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.companyDropDownArray = res.responseData;
          console.log("comname", this.companyDropDownArray);
        }
      }
    })
  }
  //--------------------------------------------------------------- dropDown Ends---------------------------------------------------

  //--------------------------------------------------------------- Form Starts---------------------------------------------
  getFormData() {
    this.salaryForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      createdDate: new Date(),
      modifiedDate: new Date(),
      "isDeleted": true,
      "id": 0,
      companyId: [''],
      salary_Component: [''],
      isPercentage: [],
      value: []
    })

  }

  //--------------------------------------------------------------- Form Ends--------------------------------------------

  onSubmit() {
    let radioValues = this.salaryForm.value.isPercentage;
    if (radioValues == 0) {
      this.salaryForm.controls['isPercentage'].setValue(true);
    }
    else {
      this.salaryForm.controls['isPercentage'].setValue(false);
    }


    let postObj = this.salaryForm.value;
    if (this.editFlag == false) {
      console.log("postObj", postObj);
      this.service.setHttp('post', 'api/SalaryType', false, postObj, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          this.snack.open(res.statusMessage, "Ok");
        }
      })
      // } else {
      //   this.editFlag = true;
      //   this.service.setHttp('put', 'api/SalaryType', false, postObj, false, 'baseURL');
      //   this.service.getHttp().subscribe({
      //     next: (res: any) => {
      //       this.snack.open(res.statusMessage,'Ok');
      //     }
      //   })
    }

  }
  OnEdit(obj?: any) {
    // this.editFlag = true;
    let editObj=obj;
    this.data = editObj;
    editObj.isPercentage == 0?editObj.isPercentage=true :false 
    this.salaryForm.patchValue({
      createdBy: 0,
      modifiedBy: 0,
      createdDate: new Date(),
      modifiedDate: new Date(),
      isDeleted: true,
      id: 0,
      companyId: obj.companyId,
      salary_Component: obj.salary_Component,
      isPercentage: obj.isPercentage,
      value: obj.value
    })
    this.getCompanyNameDropdown();

  }


}






