import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSalaryTypeComponent } from './add-salary-type/add-salary-type.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';
@Component({
  selector: 'app-salary-type-registration',
  templateUrl: './salary-type-registration.component.html',
  styleUrls: ['./salary-type-registration.component.scss']
})
export class SalaryTypeRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'Company_Name', 'Salary_Component', 'IsPercentage', 'Value', 'action'];
  dataSource = ELEMENT_DATA;
  filterForm!: FormGroup;
  salary_Component: any;
  totalCount: any;
  currentPage: number = 0;
  companyDropDownArray = new Array();
  salaryTypeSearch = ''
  companyTypeSearch = 0;
  constructor(public dialog: MatDialog, private service: CallApiService, private snack: MatSnackBar, private fb: FormBuilder, private commonApi: CommonApiService, private handalErrorSer: HandelErrorService,public validationPattern:ValidationPatternService) { }

  ngOnInit(): void {
    this.getAllTableData();
    this.filterFormMethod();
    this.getCompanyDropdown();
  }
  //--------------------------------------------------------------Search Bar Filter Form Starts-------------------------
  filterFormMethod() {
    this.filterForm = this.fb.group({
      salary_Component: [''],
      companyName: [''],
    })
  }
  //--------------------------------------------------------------Search Bar Filter Form Ends---------------------------

  //--------------------------------------------------------------Dialogue Module Starts--------------------------------
  openDialog(ele?: any) {
    const dialogRef = this.dialog.open(AddSalaryTypeComponent, {
      width: '30%',
      data: ele,
      disableClose: true
    });
 dialogRef.afterClosed().subscribe(result => {
      result == 'Yes' ? this.getAllTableData() :'';
    });
  }
  //--------------------------------------------------------------Dialogue Module Form Ends-----------------------------

  //----------------------------------------------------DropDown Starts-----------------------------------------------------
  getCompanyDropdown() {
    // let compId = this.filterForm.value.companyName;
    this.commonApi.getCompanies(0).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.companyDropDownArray = res.responseData;
        }
      }), error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  //----------------------------------------------------DropDown Ends-----------------------------------------------------


  //--------------------------------------------------------------Gets Table Data Starts----------------------------------
  getAllTableData() {
    this.service.setHttp('get', 'HRMS/SalaryType/GetAllSalaryTypePagination?pageno='+this.currentPage+1, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.dataSource = res.responseData;
          this.totalCount = res.responseData1.pageCount;
        }
        else {
          this.dataSource = [];
          this.handalErrorSer.handelError(res.statusCode);
        }
      }),
      error: (error: any) => {
        this.handalErrorSer.handelError(error.status);
        console.log("Error is", error);
      }
    })
  }

  // HRMS/SalaryType/GetAllSalaryTypePagination?pageno=1&pagesize=10&Salary_Component=gross&CompanyId=5
  //--------------------------------------------------------------Gets Table Data Ends------------------------------------------

  //--------------------------------------------------------------Gets Filter Data Starts---------------------------------------
  SearchfilterData() {
    this.salaryTypeSearch = this.filterForm.value.salary_Component;
    this.companyTypeSearch = this.filterForm.value.companyName;
    this.service.setHttp('get', 'HRMS/SalaryType/GetAllSalaryTypePagination?pageno=1&pagesize=10&Salary_Component=' + this.salaryTypeSearch + '&CompanyId=' + this.companyTypeSearch, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.dataSource = res.responseData;
          this.filterForm.reset();
        } else {
          this.dataSource = [];
        }
      },error: (error: any) => {
        this.handalErrorSer.handelError(error.status);
        console.log("Error is", error);
      }
    })
  }
  //--------------------------------------------------------------Gets Filter Data Ends---------------------------------------------

  //--------------------------------------------------------------Pagenation Starts-------------------------------------------------
  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.getAllTableData();
  }
  //--------------------------------------------------------------Pagenation Ends---------------------------------------------
}

const ELEMENT_DATA: PeriodicElement[] = [
  { sr_no: 1, Company_Name: '', Salary_Component: '', IsPercentage: '', Value: '', action: '' },
];
export interface PeriodicElement {
  sr_no: number;
  Company_Name: any;
  Salary_Component: any;
  IsPercentage: any;
  Value: any;
  action: any;
}
