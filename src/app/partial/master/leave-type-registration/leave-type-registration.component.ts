import { Component, OnInit } from '@angular/core';
import { AddOrganizationComponent } from '../organization-registration/add-organization/add-organization.component';
import {MatDialog} from '@angular/material/dialog';
import { AddLeaveTypeComponent } from './add-leave-type/add-leave-type.component';
@Component({
  selector: 'app-leave-type-registration',
  templateUrl: './leave-type-registration.component.html',
  styleUrls: ['./leave-type-registration.component.scss']
})
export class LeaveTypeRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'LeaveType_Name', 'Half_Day','action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddLeaveTypeComponent,{
      width:'30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
const ELEMENT_DATA: PeriodicElement[] = [
  {sr_no: 1, LeaveType_Name: '',Half_Day:'',action:''},
];
export interface PeriodicElement {
  sr_no: number;
  LeaveType_Name: any;
  Half_Day: any;
  action: any;
}
