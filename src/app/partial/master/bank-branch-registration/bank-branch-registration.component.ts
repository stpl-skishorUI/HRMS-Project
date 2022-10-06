import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';
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
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(public dialog: MatDialog, private api: CallApiService, private fb: FormBuilder, private mat: MatSnackBar) { }

  ngOnInit(): void {
    this.bindTable();
    this.bankNameDropDown();
    this.defaultForm();
    this.filterData();
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBankBranchRegistrationComponent, {
      width: '50%',
      height: '70%',
      data: this.dataSource,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  bindTable() {
    this.api.setHttp('get', 'HRMS/BankBranchRegistration/GetAllBankBranchByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 && res.responseData.length ? (this.dataSource = res.responseData, this.totalCount = res.responseData1.pageCount) : this.dataSource = []
      }, error: (error: any) => {
        console.log("Error is : ", error);
      }
    })
  }

  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.bindTable();
  }

  defaultForm() {
    this.regForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": this.editFlag ? this.editObj.id : 0,
      "bankId": this.editFlag ? this.editObj.bankId : 0,
      "branchName": this.editFlag ? this.editObj.branchName : "",
      "ifsC_Code": this.editFlag ? this.editObj.ifsC_Code : ""
    })
  }

  filterData() {
    this.filterForm = this.fb.group({
      "id": 0,
      "branch": ""
    })
  }
//------For clear the fields when we change the Bank Name-----//
  onChanges(event: any) {
    event.value ? (this.regForm.controls['branchName'].setValue(''), this.regForm.controls['ifsC_Code'].setValue('')) : '';
  }

  onSearch() {
    let id = this.filterForm.value.id;
    let text = this.filterForm.value.branch;
    this.api.setHttp('get', 'HRMS/BankBranchRegistration/GetAll?searchtxt=' + text + '&Id=' + id, false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        console.log(res);
        res.statusCode ==200 && res.responseData.length ? this.dataSource = res.responseData :this.dataSource =[] ;
      }, error: (error: any) => {
        console.log("Error is : ", error);
      }
    })
  }

  onCancel() {
    this.editFlag = false;
    this.regForm.reset();
  }

  //----------------------------- Dropdown Starts-------------------------------------//
  bankNameDropDown() {
    this.api.setHttp('get', 'api/CommonDropDown/GetBankRegistration', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 ? this.bankNames = res.responseData : this.bankNames = [];
      }, error: (error: any) => {
        console.log("Error is : ", error);
      }
    })
  }
  //----------------------------- Dropdown Ends-------------------------------------//
  onEdit(data: any) {
    this.editFlag = true;
    this.editObj = data;
    this.bankNameDropDown();
    this.defaultForm();
  }

  onSubmit() {
    let obj = this.regForm.value;
    console.log(obj);
    this.api.setHttp(this.editFlag ? 'put' : 'post', 'HRMS/BankBranchRegistration', false, obj, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        this.mat.open(res.statusMessage, 'ok');
        this.bindTable();
        this.regForm.reset();
      }, error: (error: any) => {
        console.log("Error is : ", error);
      }
    })
    this.editFlag = false;
  }
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   { sr_no: 1, Bank_Name: '', Branch_Name: '', IFSC_Code: '' },
// ];
// export interface PeriodicElement {
//   sr_no: number;
//   Bank_Name: any;
//   Branch_Name: any;
//   IFSC_Code: any;
// }
