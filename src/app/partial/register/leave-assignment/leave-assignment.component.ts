import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-assignment',
  templateUrl: './leave-assignment.component.html',
  styleUrls: ['./leave-assignment.component.scss']
})
export class LeaveAssignmentComponent implements OnInit {
  displayedColumns: string[] = ['position', 'Leave_Type', 'Allowed_No_of_Leave'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, Leave_Type: '	', Allowed_No_of_Leave:''},
];
export interface PeriodicElement {
  position: number;
  Leave_Type: string;
  Allowed_No_of_Leave: any;

}