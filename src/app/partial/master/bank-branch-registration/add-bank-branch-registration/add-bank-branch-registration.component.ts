import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-add-bank-branch-registration',
  templateUrl: './add-bank-branch-registration.component.html',
  styleUrls: ['./add-bank-branch-registration.component.scss']
})
export class AddBankBranchRegistrationComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'Bank_Name','action'];
  dataSource = ELEMENT_DATA;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any ) {
    this.dataSource = this.data;
    
  }

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
