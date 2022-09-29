import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddDesignationComponent } from './add-designation/add-designation.component';

@Component({
  selector: 'app-designation-registration',
  templateUrl: './designation-registration.component.html',
  styleUrls: ['./designation-registration.component.scss']
})
export class DesignationRegistrationComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  addDesignation() {
    const dialogRef = this.dialog.open(AddDesignationComponent,{
      width: '30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  displayedColumns: string[] = ['srno', 'designation_name', 'department_name', 'company','action'];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  srno: number;
  designation_name: string;
  department_name: string;
  company: string;
  action: any;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, designation_name: 'Html Designer', department_name: 'Software Development', company: 'shaurya',action:''}
];
