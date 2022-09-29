import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddBankRegistrationComponent } from './add-bank-registration/add-bank-registration.component';

@Component({
  selector: 'app-bank-registration',
  templateUrl: './bank-registration.component.html',
  styleUrls: ['./bank-registration.component.scss']
})
export class BankRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'Bank_Name','action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddBankRegistrationComponent,{
      width:'30%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  {sr_no: 1, Bank_Name: '',action:''},
];
export interface PeriodicElement {
  sr_no: number;
  Bank_Name: any;
  action: any;
}
