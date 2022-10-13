import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
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
  pageSize = 10;

  sendObj = { organizationId: 0, companyId: 0, bankId: 0, branchId: 0, accountType: '' }

  constructor(public dialog: MatDialog, private api: CallApiService, private fb: FormBuilder
    , private handalErrorService: HandelErrorService, private commonApi: CommonApiService) { }

  ngOnInit(): void {
    this.filterFormData();
    this.getOrganizationNameDropdown();
    this.getBankNameDropdown();
    this.bindTableData()
  }
  openDialog(editObj?: any) {
    const dialogRef = this.dialog.open(AddCompanyBankRegistrationComponent, {
      width: '40%',
      data: editObj, 
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      result == 'yes' ? this.bindTableData() : '';
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

  // --------------------------------------------Bind Table Data-------------------------------------------

  bindTableData() {
    this.api.setHttp('get', 'api/CompanyBankAccount/GetAllAccountByPagination?pageno=' + (this.currentPage + 1) + '&pagesize='+this.pageSize+'&OrganizationId=' + this.sendObj.organizationId + '&CompanyId=' + this.sendObj.companyId + '&BankId=' +
      this.sendObj.bankId + '&BranchId=' + this.sendObj.branchId + '&AccountType=' + this.sendObj.accountType,
      false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.dataSource = res.responseData;
          this.totalCount = res.responseData1.pageCount;
        }
        else {
          this.dataSource = [];
          this.handalErrorService.handelError(res.statusCode);
        }
      }),
      error: (error: any) => {
        this.handalErrorService.handelError(error.status);
      }
    })
  }

  // --------------------------------------------Bind Table Data-------------------------------------------

  // --------------------------------------------Dropdown Start-------------------------------------------

  getOrganizationNameDropdown() {
    this.commonApi.getOrganization().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.organizationNameArray = res.responseData;
        }
      })
      // error: (error: any) => {
      //   this.handalErrorService.handelError(error.status);
      // }
    })
  }

  getCampanyNameDropdown() {
    let id = this.filterForm.value.organizationId;
    this.commonApi.getCompanies(id).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.campanyNameArray = res.responseData;
        }
      })
      // error: (error: any) => {
      //   console.log("Error is", error);
      // }
    })
  }

  getBankNameDropdown() {
    this.commonApi.getBanks().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.bankNameArray = res.responseData;
        }
      })
      // error: (error: any) => {
      //   this.handalErrorService.handelError(error.status);
      // }
    })
  }

  getBranchNameDropdown() {
    let id = this.filterForm.value.bankId;
    this.commonApi.getBranchesByBankId(id).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.branchNameArray = res.responseData;
        }
      })
      // error: (error: any) => {
      //   this.handalErrorService.handelError(error.status);
      // }
    })
  }

  pageChanged(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.bindTableData()
  }

  // --------------------------------------------Dropdown End-------------------------------------------

  clearForm(id: string) {
    if (id == 'organization') {
      this.filterForm.controls['companyId'].reset();
      this.filterForm.controls['bankId'].reset();
      this.filterForm.controls['branchId'].reset();
      this.filterForm.controls['accountType'].reset();
    } else if (id == 'company') {
      this.filterForm.controls['bankId'].reset();
      this.filterForm.controls['branchId'].reset();
      this.filterForm.controls['accountType'].reset();
    } else if (id == 'bank') {
      this.filterForm.controls['accountType'].reset();
    } else if (id == 'branch') {
      this.filterForm.controls['accountType'].reset();
    }
  }

  FilterFormSubmit() {
    let obj = this.filterForm.value;
    this.sendObj.organizationId = obj.organizationId ?obj.organizationId :0;
    this.sendObj.companyId = obj.companyId ?obj.companyId :0;
    this.sendObj.bankId = obj.bankId ?obj.bankId :0;
    this.sendObj.branchId = obj.branchId ?obj.branchId :0;
    this.sendObj.accountType = obj.accountType ?obj.accountType :'';
    this.currentPage = 0;
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
