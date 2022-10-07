import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrganizationComponent } from './add-organization/add-organization.component';

@Component({
  selector: 'app-organization-registration',
  templateUrl: './organization-registration.component.html',
  styleUrls: ['./organization-registration.component.scss']
})
export class OrganizationRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'organization_logo', 'organization_name', 'email','address','action'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog(): void {
    this.dialog.open(AddOrganizationComponent, {
      width: '50%'
    });
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, organization_logo: '', organization_name: 'shaurya', email: 'H',address:'Pune-11',action:''},
];
export interface PeriodicElement {
  srno: number;
  organization_logo: string;
  organization_name: string;
  email: string;
  address: string;
  action: any;
}
