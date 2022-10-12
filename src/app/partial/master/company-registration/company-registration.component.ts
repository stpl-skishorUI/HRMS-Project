import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  companyFilterForm !: FormGroup;
  displayedColumns: string[] = ['srno', 'companyLogo', 'companyName', 'emailId', 'address', 'action'];
  dataSource = new Array();
  totalCount: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;
  record: string = '';
  orgId: number = 0;

  organizationArr = new Array;
  constructor(public dialog: MatDialog, private service: CallApiService, private fb: FormBuilder, private snackbar: MatSnackBar,
    private handleError : HandelErrorService, private commonApi : CommonApiService, public validationService : ValidationPatternService) { }

  ngOnInit(): void {
    this.filterForm();
    this.getTableData();
    this.getOrganizationData();
  }

  // ---------------------------------------- Filter Form Field ---------------------------------------- //
  filterForm() {
    this.companyFilterForm = this.fb.group({
      filterOrganizationId: [''],
      filterSearchText: ['']
    })
  }
  // ---------------------------------------- Filter Form Field ---------------------------------------- //

  // ---------------------------------- Organization dropdown ---------------------------------- //
  getOrganizationData() {
    this.commonApi.getOrganization().subscribe({
      next: (response: any) => {
        if(response.statusCode == 200){
          this.organizationArr = response.responseData;
        }else{
          this.handleError.handelError(response.statusCode);
        }
      }
    }),(error: any) => {
      console.log(error)
        this.handleError.handelError(error.statusCode);
      }
  }
  // ---------------------------------- Organization dropdown ---------------------------------- //

  // ----------------------------------------- Mat Dialog Box ----------------------------------------- //
  dialogBox(obj?: any) {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '40%',
      data: obj,
      disableClose : true
    });

    dialogRef.afterClosed().subscribe(result => {
      result == 'yes' ? this.getTableData() : '';
      // console.log(`Dialog result: ${result}`);
    
    });
  }
  // ---------------------------------------- Mat Dialog Box ---------------------------------------- //

  // ----------------------------------------- Bind Table -------------------------------------------- // 
  getTableData() {
    this.service.setHttp('get', 'api/CompanyRegistration/GetAllCompanies?pageno=' + (this.currentPage + 1) + '&pagesize=10&searchText=' + this.record + '&orgId=' + this.orgId, false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.dataSource = res.responseData;
          this.dataSource.map((cr: any) => {
            cr.companyLogo = "http://hrmssvr.erpguru.in/Uploads" + cr.companyLogo.split('Uploads')[1];
          })
          this.totalCount = res.responseData1.pageCount;
          // console.log(res);
        } else {
          this.dataSource = [];
          this.handleError.handelError(res.statusCode);
        }
      }, error: (error: any) => {
        this.handleError.handelError(error.status);
        console.log("Error : ", error);
      }
    })
  }
  // ----------------------------------------- Bind Table -------------------------------------------- // 

  // ----------------------------------------- Filter Logic -------------------------------------------- // 
  filterRecord() {
    this.record = this.companyFilterForm.value.filterSearchText;
    this.orgId = this.companyFilterForm.value.filterOrganizationId;
    this.getTableData()
  }

  onPageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.getTableData();
  }
  // ----------------------------------------- Filter Logic -------------------------------------------- // 

  onDelete(id: number) {
    this.service.setHttp('delete', 'api/CompanyRegistration?id=' + id, false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.getTableData();
        }
      }, error: (error: any) => {
        this.handleError.handelError(error.status);
        console.log("Error : ", error);
      }
    })
  }

}

