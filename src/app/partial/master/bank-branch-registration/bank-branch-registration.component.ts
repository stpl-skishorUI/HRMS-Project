import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';
import { AddBankBranchRegistrationComponent } from './add-bank-branch-registration/add-bank-branch-registration.component';
@Component({
  selector: 'app-bank-branch-registration',
  templateUrl: './bank-branch-registration.component.html',
  styleUrls: ['./bank-branch-registration.component.scss']
})
export class BankBranchRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'Bank_Name', 'Branch_Name', 'IFSC_Code', 'Action'];
  dataSource = new Array();
  bankNames = new Array();
  regForm!: FormGroup;
  filterForm!: FormGroup
  editObj: any;
  editFlag: boolean = false;
  totalCount: number = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private commonApi: CommonApiService, public dialog: MatDialog,
    private api: CallApiService, private fb: FormBuilder, private mat: MatSnackBar,
    public validationPattern: ValidationPatternService, private handleError: HandelErrorService) { }

  ngOnInit(): void {
    this.defaultForm();
    this.bindTable();
    this.bankNameDropDown();
    this.filterData();
  }

  //----------------------------- Dropdown Starts-------------------------------------//
  bankNameDropDown() {
    this.commonApi.getBanks().subscribe({
      next: (res: any) => {
        res.statusCode == 200 && res.responseData.length ? this.bankNames = res.responseData : this.bankNames = [];
      }, error: (error: any) => {
        console.log("Error is : ", error);
      }
    })
  }
  //----------------------------- Dropdown Ends-------------------------------------//

  filterData() {
    this.filterForm = this.fb.group({
      "id": [0],
      "branch": [""]
    })
  }

  onSearch() {
    let formValue = this.filterForm.value;
    this.api.setHttp('get', 'HRMS/BankBranchRegistration/GetAllBankBranchByPagination?searchtxt=' + formValue?.branch + '&BankId=' + formValue?.id, false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 && res.responseData.length ? (this.dataSource = res.responseData, this.totalCount = res.responseData1.pageCount) : (this.dataSource = [], this.handleError.handelError(res.statusCode));
      }, error: (error: any) => {
        this.handleError.handelError(error.status);
      }
    })
  }

  bindTable() {
    this.api.setHttp('get', 'HRMS/BankBranchRegistration/GetAllBankBranchByPagination?pageno=' + (this.currentPage + 1) + '&pagesize='+this.pageSize+'&BankId=0', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 && res.responseData.length ? (this.dataSource = res.responseData, this.totalCount = res.responseData1.pageCount) : (this.dataSource = [], this.handleError.handelError(res.statusCode));
      }, error: (error: any) => {
        this.handleError.handelError(error.status)
      }
    })
  }

  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.bindTable();
  }

  onEdit(data: any) {
    this.editFlag = true;
    this.editObj = data;
    this.bankNameDropDown();
    this.defaultForm();
  }

  defaultForm() {
    this.regForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": this.editFlag ? this.editObj.id : 0,
      "bankId": [this.editFlag ? this.editObj.bankId : 0, Validators.required],
      "branchName": [this.editFlag ? this.editObj.branchName : "", Validators.required],
      "ifsC_Code": [this.editFlag ? this.editObj.ifsC_Code : "", [Validators.required, Validators.pattern('^[A-Z]{4}0[A-Z0-9]{6}$')]]
    })
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBankBranchRegistrationComponent, {
      width: '50%',
      data: this.dataSource,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.bankNameDropDown();
    });
  }

  get fc() { return this.regForm.controls };
  //------For clear the fields when we change the Bank Name-----//
  onChanges(event: any) {
    event.value ? (this.regForm.controls['branchName'].setValue(''), this.regForm.controls['ifsC_Code'].setValue('')) : '';
  }

  onCancel(clear: any) {
    this.editFlag = false;
    clear.resetForm()
    this.defaultForm();
  }

  onSubmit(clear: any) {
    let branchName = this.fc['branchName'].value;
    if (!branchName.replace(/\s/g, '').length && this.regForm.invalid) { //string length is 0
      return;
    }
    else {
      let obj = this.regForm.value;
      this.api.setHttp(this.editFlag ? 'put' : 'post', 'HRMS/BankBranchRegistration', false, obj, false, 'baseURL');
      this.api.getHttp().subscribe({
        next: (res: any) => {
          res.statusCode == 200 ? (this.mat.open(res.statusMessage, 'ok'), this.bindTable(), this.editFlag = false, clear.resetForm(), this.defaultForm()) : this.handleError.handelError(res.statusCode);
        }, error: (error: any) => {
          this.handleError.handelError(error.status)
        }
      })
    }
  }
}
