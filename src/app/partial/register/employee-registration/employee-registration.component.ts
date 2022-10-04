import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { AddEmployeeDetailsComponent } from './add-employee-details/add-employee-details.component';


@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  displayedColumns: string[] = ['srno', 'emp_code', 'emp_name', 'company','department','designation','action'];
  dataSource = ELEMENT_DATA;

  addempdetails() {
    const dialogRef = this.dialog.open(AddEmployeeDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}


export interface PeriodicElement {
  srno: number;
  emp_code: number;
  emp_name: string;
  company: string;
  department: string;
  designation: string;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, emp_code: 12214, emp_name: 'Ram Chavan', company: 'H', department:'Software Development',designation:'Manager',action:''}
];
