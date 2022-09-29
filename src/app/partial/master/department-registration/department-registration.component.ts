import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddDepartmentComponent } from './add-department/add-department.component';

@Component({
  selector: 'app-department-registration',
  templateUrl: './department-registration.component.html',
  styleUrls: ['./department-registration.component.scss']
})
export class DepartmentRegistrationComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  adddept() {
    const dialogRef = this.dialog.open(AddDepartmentComponent,{
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  displayedColumns: string[] = ['srno', 'company_name', 'department_name','action'];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  srno: number;
  company_name: string;
  department_name: string;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, company_name: 'Hydrogen', department_name: 'designing',action:''}
];


