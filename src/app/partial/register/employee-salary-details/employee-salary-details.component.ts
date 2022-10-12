import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddSalaryTypeComponent } from '../../master/salary-type-registration/add-salary-type/add-salary-type.component';
import { AddNewSalaryComponent } from './add-new-salary/add-new-salary.component';

@Component({
  selector: 'app-employee-salary-details',
  templateUrl: './employee-salary-details.component.html',
  styleUrls: ['./employee-salary-details.component.scss'],
})
export class EmployeeSalaryDetailsComponent implements OnInit {
  filterForm!: FormGroup;
  company = new Array();
  employee = new Array();
  year = new Array();
  totalCount: any;
  currentPage: number = 0;
  pageSize = 10;
  companyId: number = 0;
  EmpCode = new Array();
  YearId = new Array();
  constructor(
    public dialog: MatDialog,
    private service: CallApiService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.defaultForm();
    this.displayData();
    this.getAllCompanay();
    this.getAllEmployee();
    this.getYear();
  }

  defaultForm() {
    this.filterForm = this.fb.group({
      companyId: [0],
      allemployee: [0],
      year: [0],
    });
  }
  addnewsalary() {
    const dialogRef = this.dialog.open(AddNewSalaryComponent, {
      width: '50%',
      hasBackdrop:false
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
  displayedColumns: string[] = [
    'srno',
    'employee_name',
    'gross_salary',
    'effective_date',
    'actions',
  ];
  dataSource = ELEMENT_DATA;

  //--------------------------------------------------------------- Table Display ------------------------------------------------------------------------------------
  displayData() {
    this.service.setHttp(
      'get',
      'HRMS/EmployeeSalaryDetails/GetEmpSalary?companyId=' +this.filterForm.controls['companyId'].value +
        '&EmpCode=' +
        this.filterForm.controls['allemployee'].value +
        '&YearId=' +
        this.filterForm.controls['year'].value +
        '&pageno=' +
        (this.currentPage + 1) +
        '&pagesize=10',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.dataSource = res.responseData;
          // this.dataSource = res.responseData1;
          this.totalCount = res.responseData1.pageCount;
        }
      },
    });
  }

  //-----------------------------------------------------------------AllCompanay-------------------------------------------------------------------------------
  getAllCompanay() {
    this.service.setHttp(
      'get',
      'api/CommonDropDown/GetCompany',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.company = res.responseData;
        }
      },
    });
  }

  //--------------------------------------------------------------AllEmployee----------------------------------------------------------------------------------------
  getAllEmployee() {
    this.service.setHttp(
      'get',
      'api/CommonDropDown/GetEmployee',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.employee = res.responseData;
        }
      },
    });
  }

  //---------------------------------------------------------------------------Year---------------------------------------------------------------------------
  getYear() {
    this.service.setHttp(
      'get',
      'api/CommonDropDown/GetYear',
      false,
      false,
      false,
      'baseURL'
    );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.year = res.responseData;
        }
      },
    });
  }

  //-----------------------------------------------------Pagination----------------------------------------------------------------
  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.displayData();
  }

  //------------------------------------------------------------------Change Company---------------------------------------------------------------
  onChangeCompany() {
    this.filterForm.patchValue({
      allemployee: 0,
      year: 0,
    });
    this.displayData();
  }
  //------------------------------------------------------------------Change Employee  ---------------------------------------------------------------
  onChangeEmployee() {
    this.displayData();
  }
}

export interface PeriodicElement {
  srno: number;
  employee_name: string;
  gross_salary: number;
  effective_date: string;
  actions: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    srno: 1,
    employee_name: 'Ram Chavan',
    gross_salary: 500000,
    effective_date: '03-10-2022',
    actions: '',
  },
];
