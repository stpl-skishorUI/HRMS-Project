import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salary-processing',
  templateUrl: './salary-processing.component.html',
  styleUrls: ['./salary-processing.component.scss']
})
export class SalaryProcessingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['srno', 'emp_id', 'emp_name', 'lwp','gross_salary','basic_pay','hra','lta','bonus','other','ot','pf','pt','esic','tds','advance','lwf','net_salary'];
  dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  srno: number;
  emp_id: number;
  emp_name: string;
  lwp: string;
  gross_salary: number;
  basic_pay: number;
  hra: number;
  lta: number;
  bonus: number;
  other: number;
  ot: number;
  pt: number;
  pf: number;
  esic: number;
  tds: number;
  advance: number;
  lwf: number;
  net_salary: number;

}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, emp_id: 122214, emp_name: 'Ram Chavan', lwp: 'H',gross_salary: 500000,basic_pay: 100000,hra: 0, lta: 0, bonus:2000,other: 0, ot: 0, pf: 0,pt:0, esic: 0, tds: 0, advance: 0, lwf: 0, net_salary: 500000 }
];