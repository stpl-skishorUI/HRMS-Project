import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSalaryTypeComponent } from './add-salary-type/add-salary-type.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-salary-type-registration',
  templateUrl: './salary-type-registration.component.html',
  styleUrls: ['./salary-type-registration.component.scss']
})
export class SalaryTypeRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'Company_Name', 'Salary_Component', 'IsPercentage', 'Value', 'action'];
  dataSource = ELEMENT_DATA;
  filterForm!: FormGroup;
  salary_Component = '';
  constructor(public dialog: MatDialog, private service: CallApiService,
    private snack: MatSnackBar, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllTableData();
    this.filterFormMethod();
  }
  //--------------------------------------------------------------Search Bar Filter Form Starts--------------------------------
  filterFormMethod() {
    this.filterForm = this.fb.group({
      salary_Component: [''],
    })
  }
  //--------------------------------------------------------------Search Bar Filter Form Ends--------------------------------

  //--------------------------------------------------------------Dialogue Module Starts--------------------------------
  openDialog(ele?: any) {
    const dialogRef = this.dialog.open(AddSalaryTypeComponent, {
      width: '30%',
      data: ele
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTableData();
      console.log(`Dialog result: ${result}`);
    });
  }
  //--------------------------------------------------------------Dialogue Module Form Ends--------------------------------


  //--------------------------------------------------------------Gets Table Data Starts--------------------------------
  getAllTableData() {
    this.service.setHttp('get', 'HRMS/SalaryType/GetAllSalaryTypePagination', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {

        if (res.statusCode == 200 && res.responseData.length > 0) {
          this.snack.open(res.statusMessage, 'Ok', { duration: 4000 });
          this.dataSource = res.responseData;
        }
      }
    })
  }
  //--------------------------------------------------------------Gets Table Data Ends--------------------------------

  //--------------------------------------------------------------Gets Filter Data Starts--------------------------------
  SearchfilterData() {
    let salaryTypeSearch = this.filterForm.value.salary_Component;
    this.service.setHttp('get', 'HRMS/SalaryType/GetList?compname=' + salaryTypeSearch, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.dataSource = res.responseData;
          this.filterForm.reset();
        }
      }
    })
  }
  //--------------------------------------------------------------Gets Filter Data Ends--------------------------------
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
