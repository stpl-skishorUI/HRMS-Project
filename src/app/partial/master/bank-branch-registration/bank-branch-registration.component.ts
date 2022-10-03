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
  dataSource = ELEMENT_DATA;
  bankNames = new Array();
  regForm!: FormGroup;
  filterForm! : FormGroup
  editObj: any;
  id = "";
  editFlag: boolean = false;

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
      data: this.dataSource
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  bindTable() {
    this.api.setHttp('get', 'api/BankBranchRegistration/GetAll', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) =>
        res.statusCode == 200 ? this.dataSource = res.responseData : this.dataSource = []
    })
  }
  defaultForm() {
    this.regForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id": 0,
      "bankId": this.editFlag ? this.editObj.id : 0,
      "branchName": this.editFlag ? this.editObj.branchName : "",
      "ifsC_Code": this.editFlag ? this.editObj.ifsC_Code : ""
    })
  }
  filterData(){
    this.filterForm = this.fb.group({
      "id" : 0,
      "branch" : ""
    })
  }
  onSearch(){
    let text = this.filterForm.value.id;
    this.api.setHttp('get','api/BankRegistration/GetAll?BankName='+text,false,false,false,'baseURL');
    this.api.getHttp().subscribe({
      next : (res:any)=>{
        this.dataSource = res.responseData
      }
    })
  }
  //----------------------------- Dropdown Starts-------------------------------------//
  bankNameDropDown() {
    this.api.setHttp('get', 'api/CommonDropDown/GetBankRegistration', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) =>
        res.statusCode == 200 ? this.bankNames = res.responseData : this.bankNames = []
    })

  }
  //----------------------------- Dropdown Ends-------------------------------------//
  onEdit(data: any) {
    this.editFlag = true;
    this.bankNameDropDown();
    this.editObj = data; 
    this.defaultForm();
    console.log(data);
  }
  onDelete(id: any) {
    console.log(id);
    let obj = {
      "id": id,
      "modifiedBy": 0,
      "modifiedDate": new Date()
    }
    this.api.setHttp('delete', 'api/BankBranchRegistration', false, obj, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        this.mat.open(res.statusMessage, 'ok');
        this.bindTable();
      }
    })
  }

  onSubmit() {
    let obj = this.regForm.value;
    console.log(obj);
    this.api.setHttp(this.editFlag ? 'put':'post', 'api/BankBranchRegistration', false, obj, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        this.mat.open(res.statusMessage, 'ok');
        this.bindTable();
       
        this.regForm.reset();
      }
    })
    this.editFlag = false;
  }
}
const ELEMENT_DATA: PeriodicElement[] = [
  { sr_no: 1, Bank_Name: '', Branch_Name: '', IFSC_Code: '' },
];
export interface PeriodicElement {
  sr_no: number;
  Bank_Name: any;
  Branch_Name: any;
  IFSC_Code: any;
}
