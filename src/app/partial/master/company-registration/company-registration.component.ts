import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddCompanyComponent } from './add-company/add-company.component';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  addCompany() {
    const dialogRef = this.dialog.open(AddCompanyComponent,{
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  displayedColumns: string[] = ['srno', 'company_logo','company_name', 'email', 'address','action'];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  srno: number;
  company_logo: string;
  company_name: string;
  email: string;
  address: string;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, company_logo: 'Hydrogen', company_name: 'shaurya', email: 'abs@gmail.com',address:'Pune',action:''}
];
