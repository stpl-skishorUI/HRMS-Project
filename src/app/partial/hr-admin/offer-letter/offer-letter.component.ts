import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-letter',
  templateUrl: './offer-letter.component.html',
  styleUrls: ['./offer-letter.component.scss']
})
export class OfferLetterComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'Contact_No', 'Company','Department_Name','Designation_Name','Registration',];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '', Contact_No:'', Company: '',Department_Name:'',Designation_Name:'',Registration:'',},
 
];


export interface PeriodicElement {
  name: string;
  position: number;
  Contact_No: any;
  Company: any;
  Department_Name: any;
  Designation_Name: any;
  Registration: any;
}
