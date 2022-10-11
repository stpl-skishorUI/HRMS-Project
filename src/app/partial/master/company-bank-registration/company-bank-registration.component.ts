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
  filterForm!: FormGroup
  displayedColumns: string[] = ['sr_no', 'companyName', 'bankName', 'branchName', 'accountNo', 'Action'];
  dataSource = ELEMENT_DATA;

  organizationNameArray = new Array();
  campanyNameArray = new Array();
  bankNameArray = new Array();
  branchNameArray = new Array();
  accountTypeArray = ['saving', 'current'];

  totalCount: number = 0;
  currentPage: number = 0;

  sendObj = { organizationId: 0, CompanyId: 0, BankId: 0, BranchId: 0, AccountType: '' }

  constructor(public dialog: MatDialog, private api: CallApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterFormData();
    this.getOrganizationNameDropdown();
    this.getBankNameDropdown();
    // this.getBranchNameDropdown();
    this.bindTableData()
  }
  openDialog(editObj?: any) {
    const dialogRef = this.dialog.open(AddCompanyBankRegistrationComponent, {
      width: '40%',
      data: editObj, disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.bindTableData();
      // console.log(`Dialog result: ${result}`);
    });
  }

  filterFormData() {
    this.filterForm = this.fb.group({
      organizationId: [''],
      companyId: [''],
      bankId: [''],
      branchId: [''],
      accountType: [''],
    });
  }

  // --------------------------------------------Blind Table Data-------------------------------------------

  bindTableData() {
    this.api.setHttp('get', 'api/CompanyBankAccount/GetAllAccountByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10&OrganizationId=' + this.sendObj.organizationId + '&CompanyId=' + this.sendObj.CompanyId + '&BankId=' +
      this.sendObj.BankId + '&BranchId=' + this.sendObj.BranchId + '&AccountType=' + this.sendObj.AccountType,
      false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.dataSource = res.responseData;
          this.totalCount = res.responseData1.pageCount;
        }
        else {
          this.dataSource = []
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  // --------------------------------------------Blind Table Data-------------------------------------------

  // --------------------------------------------Dropdown Start-------------------------------------------

  getOrganizationNameDropdown() {
    this.api.setHttp('get', 'api/CommonDropDown/GetOrganization', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.organizationNameArray = res.responseData;
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  getCampanyNameDropdown() {
    let id = this.filterForm.value.organizationId;
    console.log(id);

    this.api.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId=' + id, false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.campanyNameArray = res.responseData;
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  getBankNameDropdown() {
    this.api.setHttp('get', 'api/CommonDropDown/GetBankRegistration', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.bankNameArray = res.responseData;
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  getBranchNameDropdown() {
    let id = this.filterForm.value.bankId;
    this.api.setHttp('get', 'api/CommonDropDown/GetBankBranchRegistration?BankId=' + id, false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.branchNameArray = res.responseData;
        }
      },
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.bindTableData()
  }

  // --------------------------------------------Dropdown End-------------------------------------------


  clearForm(id: string) {
    if (id == 'organization') {
      this.filterForm.controls['bankId'].setValue('');
      this.filterForm.controls['branchId'].setValue('');
      this.filterForm.controls['accountType'].setValue('');
    } else if (id == 'company') {
      this.filterForm.controls['bankId'].setValue('');
      this.filterForm.controls['branchId'].setValue('');
      this.filterForm.controls['accountType'].setValue('');
    } else if (id == 'bank') {
      this.filterForm.controls['accountType'].setValue('');
    } else if (id == 'branch') {
      this.filterForm.controls['accountType'].setValue('');
    }
  }




  FilterFormSubmit() {
    let obj = this.filterForm.value;
    this.sendObj.organizationId = obj.organizationId;
    this.sendObj.CompanyId = obj.companyId;
    this.sendObj.BankId = obj.bankId;
    this.sendObj.BranchId = obj.branchId;
    this.sendObj.AccountType = obj.accountType;
    this.currentPage = 0
    this.bindTableData();
  }


}
const ELEMENT_DATA: PeriodicElement[] = [
  { sr_no: 1, LeaveType_Name: '', Half_Day: '', Branch_Name: '', Account_No: '', },
];
export interface PeriodicElement {
  sr_no: number;
  LeaveType_Name: any;
  Half_Day: any;
  Branch_Name: any;
  Account_No: any;

}
