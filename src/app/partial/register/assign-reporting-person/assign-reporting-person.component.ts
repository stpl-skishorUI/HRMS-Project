import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assign-reporting-person',
  templateUrl: './assign-reporting-person.component.html',
  styleUrls: ['./assign-reporting-person.component.scss']
})
export class AssignReportingPersonComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'Reporting_Person_Name', 'Actions',];
  displayeColumns: string[] = ['position', 'Employee_Name', 'Approve_Right'];
  dataSource = ELEMENT_DATA;
  dataSource_A = ELEMENT_DATA_A;
  constructor() { }

  ngOnInit(): void {
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '	Navin Boddhul', Reporting_Person_Name:'Medical', Actions: ''},
];
export interface PeriodicElement {
  position: number;
  name: string;
  Reporting_Person_Name: any;
  Actions: string;

}

const ELEMENT_DATA_A: PeriodiseElement[] = [
  {position: 1, Employee_Name: '', Approve_Right:''},
];
export interface  PeriodiseElement {
  position: number;
  Employee_Name: string;
  Approve_Right: any;
 

}

