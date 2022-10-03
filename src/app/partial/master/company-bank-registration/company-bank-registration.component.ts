import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyBankRegistrationComponent } from './add-company-bank-registration/add-company-bank-registration.component';

@Component({
  selector: 'app-company-bank-registration',
  templateUrl: './company-bank-registration.component.html',
  styleUrls: ['./company-bank-registration.component.scss']
})
export class CompanyBankRegistrationComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'LeaveType_Name', 'Half_Day','Branch_Name','Account_No',];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddCompanyBankRegistrationComponent,{
      width:'40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  {sr_no: 1, LeaveType_Name: '',Half_Day:'',Branch_Name:'',Account_No:'',},
];
export interface PeriodicElement {
  sr_no: number;
  LeaveType_Name: any;
  Half_Day: any;
  Branch_Name:any;
  Account_No:any;
 
}
