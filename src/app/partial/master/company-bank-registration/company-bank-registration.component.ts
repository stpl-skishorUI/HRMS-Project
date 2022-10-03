import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddCompanyBankRegistrationComponent } from './add-company-bank-registration/add-company-bank-registration.component';

@Component({
  selector: 'app-company-bank-registration',
  templateUrl: './company-bank-registration.component.html',
  styleUrls: ['./company-bank-registration.component.scss']
})
export class CompanyBankRegistrationComponent implements OnInit {
  filterForm!:FormGroup
  displayedColumns: string[] = ['sr_no', 'companyName', 'bankName','branchName','accountNo','Action'];
  dataSource = ELEMENT_DATA;
  campanyNameArray = new Array();
  bankNameArray = new Array();
  branchNameArray = new Array();
  accountTypeArray = ['saving','current'];

  sendObj ={
    CompanyId:0,
    BankId:0,
    BranchId:0,
    AccountType:''
  }

  constructor(public dialog: MatDialog, private api: CallApiService, private fb:FormBuilder) {}

  ngOnInit(): void {
    this.filterFormData();
    this.getCampanyNameDropdown();
    this.getBankNameDropdown();
    this.getBranchNameDropdown();
    this.blindTableData()
  }
  openDialog(editObj?:any) {
    const dialogRef = this.dialog.open(AddCompanyBankRegistrationComponent,{
      width:'40%',
      data: editObj
    });

    dialogRef.afterClosed().subscribe(result => {
      this.blindTableData();
      // console.log(`Dialog result: ${result}`);
    });
  }

  filterFormData(){
    this.filterForm = this.fb.group({
      companyId :[' '],
      bankId :[' '],
      branchId :[' '],
      accountType :[' '],
    })    
  }

  // --------------------------------------------Blind Table Data-------------------------------------------
  
  blindTableData(){
    this.api.setHttp('get','api/CompanyBankAccount/GetAllCompanyBankAccountDetails?CompanyId='+this.sendObj.CompanyId+'&BankId='+this.sendObj.BankId+'&BranchId='+this.sendObj.BranchId+'&AccountType='+this.sendObj.AccountType,
    false,false,false,'baseURL');
    this.api.getHttp().subscribe({
      next : ((res:any)=>{
        if(res.statusCode === '200' && res.responseData.length){
          this.dataSource = res.responseData;
        }
        else{
          this.dataSource = []
        }
      })
    })
  }

  // --------------------------------------------Blind Table Data-------------------------------------------

   // --------------------------------------------Dropdown Start-------------------------------------------

  getCampanyNameDropdown(){
    this.api.setHttp('get','api/CommonDropDown/GetCompany',false,false,false,'baseURL');
    this.api.getHttp().subscribe({
      next : ((res:any)=>{
        if(res.statusCode === '200' && res.responseData.length){
          this.campanyNameArray = res.responseData;          
        }
      })
    })
  }

  getBankNameDropdown(){
    this.api.setHttp('get','api/CommonDropDown/GetBankRegistration',false,false,false,'baseURL');
    this.api.getHttp().subscribe({
      next : ((res:any)=>{
        if(res.statusCode === '200' && res.responseData.length){
          this.bankNameArray = res.responseData;
        }
      })
    })
  }

  getBranchNameDropdown(){
    this.api.setHttp('get','api/CommonDropDown/GetBankBranchRegistration',false,false,false,'baseURL');
    this.api.getHttp().subscribe({
      next : ((res:any)=>{
        if(res.statusCode === '200' && res.responseData.length){
          this.branchNameArray = res.responseData;
        }
      })
    })
  }

// --------------------------------------------Dropdown End-------------------------------------------

FilterFormSubmit(){
  let obj = this.filterForm.value;
  this.sendObj.CompanyId = obj.companyId ? obj.companyId: 0;
  this.sendObj. BankId  = obj.bankId ? obj.bankId: 0;
  this.sendObj.BranchId  = obj.branchId ? obj.branchId: 0;
  this.sendObj. AccountType  = obj.accountType ? obj.accountType: '';
 this.blindTableData()
  
}


}
const ELEMENT_DATA: PeriodicElement[] = [
  {sr_no: 1, LeaveType_Name: '',Half_Day:'',Branch_Name:'',Account_No:'',},
];
export interface PeriodicElement {
  sr_no: number;
  LeaveType_Name: any;
  Half_Day: any;
  Branch_Name:any;
  Account_No:any;
 
}
