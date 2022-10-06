import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-salary-report',
  templateUrl: './employee-salary-report.component.html',
  styleUrls: ['./employee-salary-report.component.scss']
})
export class EmployeeSalaryReportComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'Gross_Salary', 'Basic_Pay','Oth_All','HRA','Edu_All','Conveyance_ALL','Medical_ALL',];
  displayedColumns_M: string[] = ['position', 'name', 'Cal_Days', 'Week_Offs','Paid_Days','Leave_Days',];
  displayedColumns_P: string[] = ['position', 'name', 'Basic', 'PF','Oth_All','HRA','Edu_All','Conveyance_ALL','Medical_ALL','Net_Salary','Adv_Pay','TDS',];
  dataSource = ELEMENT_DATA;
  dataSource_M = ELEMENT_DATA_M;
  dataSource_P = ELEMENT_DATA_P;

  constructor() { }

  ngOnInit(): void {
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '', Gross_Salary:'' , Basic_Pay: '',Oth_All:'',HRA:'',Edu_All:'',Conveyance_ALL:'',Medical_ALL:'',},
  
];

export interface PeriodicElement {
  name: any;
  position: any;
  Gross_Salary: any;
  Basic_Pay: any;
  Oth_All: any;
  HRA: any;
  Edu_All: any;
  Conveyance_ALL: any;
  Medical_ALL:any;
}

const ELEMENT_DATA_M: PeriodicElement_M[] = [
  {position: 1, name: '', Cal_Days:'' , Week_Offs: '', Paid_Days:'',Leave_Days:'',},
  
];

export interface PeriodicElement_M {
  name: any;
  position: any;
  Cal_Days: any;
  Week_Offs: any;
  Paid_Days: any;
  Leave_Days: any;
}

const ELEMENT_DATA_P: PeriodicElement_P[] = [
  {position: 1, name: '', Basic:'' , PF: '',Oth_All:'',HRA:'',Edu_All:'',Conveyance_ALL:'',Medical_ALL:'',Net_Salary:'',Adv_Pay:'',TDS:''},
  
];

export interface PeriodicElement_P {
  name: any;
  position: any;
  Basic: any;
  PF: any;
  Oth_All: any;
  HRA: any;
  Edu_All: any;
  Conveyance_ALL: any;
  Medical_ALL:any;
  Net_Salary: any;
  Adv_Pay: any;
  TDS: any;


}