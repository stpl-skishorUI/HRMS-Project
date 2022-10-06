import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.scss']
})
export class LeaveReportComponent implements OnInit {
  displayedColumns: string[] = ['position', 'Emp', 'Emp_Name', 'SL','PL','LWP','OL','C_Off','OD',];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  Emp: any;
  position: number;
  Emp_Name: any;
  SL: any;
  PL: any;
  LWP:any;
  OL:any;
  C_Off:any;
  OD:any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1,Emp:'', Emp_Name:'',SL:'',PL:'',LWP:'',OL:'',C_Off:'',OD:''},
 
];