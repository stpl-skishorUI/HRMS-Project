import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBankRegistrationComponent } from './add-bank-registration/add-bank-registration.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
@Component({
  selector: 'app-bank-registration',
  templateUrl: './bank-registration.component.html',
  styleUrls: ['./bank-registration.component.scss']
})
export class BankRegistrationComponent implements OnInit {
  bankRegiResponse: any;
  searchBankRegiForm!: FormGroup;
  companyTypeResp:any;
  editId: any;
  pageNo: number = 1;
  pageSize = 10;
  length: any;
  displayedColumns: string[] = ['sr_no', 'Bank_Name', 'action'];

  constructor(public dialog: MatDialog,
    private callAPIService: CallApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchBankRegiForm = this.fb.group({
      searchbankName: [''],
      companyId:['']
    })
    this.BankRegistrationData();
    this.bindCompanytype();
  }

  bankRegi(status: any, data?: any) {
    const bankData = {
      data: data,
      status: status
    }
    const dialogRef = this.dialog.open(AddBankRegistrationComponent, {
      width: '30%',
      data: bankData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      result == 'u' ? this.BankRegistrationData() : result == 'i';
      this.BankRegistrationData();
      // console.log(`Dialog result: ${result}`);
    });
  }

  bindCompanytype() {
    this.callAPIService.setHttp('GET', 'api/CommonDropDown/GetCompany', false, false, false, 'baseURL');
    this.callAPIService.getHttp().subscribe({
      next: (resp: any) => {
        if (resp.statusCode == 200) {
          this.companyTypeResp = resp.responseData;
        } else {
          // this.toastr.error(resp.statusMessage);
        }
      },
      // error: ((error: any) => { this.error.handelError(error.statusCode) })
    })
  }

  BankRegistrationData() {
    let formData = this.searchBankRegiForm.value;
    let obj = {
      "pageno": this.pageNo,
      "BankName": formData.searchbankName,
      "CompanyId":formData.companyId|| 0,
    }
    
    this.callAPIService.setHttp('GET', 'api/BankRegistration/GetAllBankRegiByPagination?pageno='+obj.pageno+'&pagesize=10&BankName='+obj.BankName+'&CompanyId='+obj.CompanyId, false, false, false, 'baseURL');
    this.callAPIService.getHttp().subscribe((res: any) => {
      // console.log(res);
      if (res.statusCode == 200) {
        this.bankRegiResponse = res.responseData;
        this.length = res.responseData1.pageCount;
        // console.log(this.bankRegiResponse);
      } else {
        this.bankRegiResponse = [];
        alert(res.statusMessage);
      }
    })
  }


  paginationEvent(event: any) {
    // console.log(event);
    this.pageNo = event.pageIndex + 1;
    this.BankRegistrationData();
  }




}


















