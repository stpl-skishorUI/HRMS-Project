import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddNewPaymentComponent } from './add-new-payment/add-new-payment.component';


@Component({
  selector: 'app-advance-payment',
  templateUrl: './advance-payment.component.html',
  styleUrls: ['./advance-payment.component.scss']
})
export class AdvancePaymentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  newpayment() {
    const dialogRef = this.dialog.open(AddNewPaymentComponent,{
      width: '40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayedColumns: string[] = ['srno', 'emp_name', 'advance_amt', 'date','mode_of_payment','actions'];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  srno: number;
  emp_name: string;
  advance_amt: number;
  date: string;
  mode_of_payment: string;
  actions: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, emp_name: 'Hydrogen', advance_amt: 1.0079, date: 'H', mode_of_payment: 'UPI', actions: 'ffff'}
];
