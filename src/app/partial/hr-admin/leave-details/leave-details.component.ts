import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-details',
  templateUrl: './leave-details.component.html',
  styleUrls: ['./leave-details.component.scss']
})
export class LeaveDetailsComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'Employee_Name', 'Total_Leaves', 'Taken_Leaves', 'Remaining_Leaves'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '', Employee_Name:'' , Total_Leaves: 'H', Taken_Leaves:'',Remaining_Leaves:'',},
  
];

export interface PeriodicElement {
  position: number;
  name: any;
  Employee_Name: any;
  Total_Leaves: any;
  Taken_Leaves: any;
  Remaining_Leaves: any;
}