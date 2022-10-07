import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-details-report',
  templateUrl: './task-details-report.component.html',
  styleUrls: ['./task-details-report.component.scss']
})
export class TaskDetailsReportComponent implements OnInit {
  displayedColumns: string[] = ['position', 'Task', 'Sub_Task', 'Description', 'Date','Hours',];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
export interface PeriodicElement {
  Task: any;
  position: number;
  Sub_Task: any;
  Description: any;
  Date: any;
  Hours: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, Task: '', Sub_Task: '', Description: '', Date:'',Hours:''},
 
];