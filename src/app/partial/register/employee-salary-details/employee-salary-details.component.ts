import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddSalaryTypeComponent } from '../../master/salary-type-registration/add-salary-type/add-salary-type.component';
import { AddNewSalaryComponent } from './add-new-salary/add-new-salary.component';


@Component({
  selector: 'app-employee-salary-details',
  templateUrl: './employee-salary-details.component.html',
  styleUrls: ['./employee-salary-details.component.scss']
})
export class EmployeeSalaryDetailsComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }


  addnewsalary() {
    const dialogRef = this.dialog.open(AddNewSalaryComponent,{
      width:'50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  displayedColumns: string[] = ['srno', 'employee_name', 'gross_salary', 'effective_date','actions'];
  dataSource = ELEMENT_DATA;
}

export interface PeriodicElement {
  srno: number;
  employee_name: string;
  gross_salary: number;
  effective_date: string;
  actions: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, employee_name: 'Ram Chavan', gross_salary: 500000, effective_date: '03-10-2022',actions:''}
];