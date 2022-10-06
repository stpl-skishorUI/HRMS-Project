import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddNewSalaryComponent } from './add-new-salary/add-new-salary.component';
@Component({
  selector: 'app-salary-deduction',
  templateUrl: './salary-deduction.component.html',
  styleUrls: ['./salary-deduction.component.scss']
})
export class SalaryDeductionComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  addnewsalary() {
    const dialogRef = this.dialog.open(AddNewSalaryComponent,{
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  displayedColumns: string[] = ['srno', 'company_name', 'employee_name', 'deduction_type','Month','Amount','action'];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  srno: number;
  company_name: string;
  employee_name: string;
  deduction_type: string;
  Month: string;
  Amount: number;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, company_name: 'Hydrogen',employee_name:'Ram Chavan', deduction_type: 'PF', Month: 'H',Amount:100000,action:''}
];