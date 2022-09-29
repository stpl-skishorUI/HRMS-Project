import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-bank-branch-registration',
  templateUrl: './add-bank-branch-registration.component.html',
  styleUrls: ['./add-bank-branch-registration.component.scss']
})
export class AddBankBranchRegistrationComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'Bank_Name','action'];
  dataSource = ELEMENT_DATA;

  constructor() {}

  ngOnInit(): void {
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
