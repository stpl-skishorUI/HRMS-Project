import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance-verification',
  templateUrl: './attendance-verification.component.html',
  styleUrls: ['./attendance-verification.component.scss']
})
export class AttendanceVerificationComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'Emp_Name', 'Basic_Pay', 'HRA','LTA','Bonus_ExGratia','Othall', 'Gross_Salary','PF','ESIC','PT','OT','Net_Salary','Actions'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '', Emp_Name: '', Basic_Pay: '', HRA:'', LTA:'', Bonus_ExGratia:'', Othall:'', Gross_Salary:'',PF:'',ESIC:'',PT:'',OT:'',Net_Salary:'',Actions:''},
 
];
export interface PeriodicElement {
  position: number;
  name: any;
  Emp_Name: any;
  Basic_Pay: any;
  HRA: any;
  LTA: any;
  Bonus_ExGratia: any;
  Othall: any;
  Gross_Salary: any;
  PF: any;
  ESIC: any;
  PT: any;
  OT: any;
  Net_Salary: any;
  Actions: any;
}

