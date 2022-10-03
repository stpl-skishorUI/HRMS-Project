import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddDocumentTypeRegistrationComponent } from './add-document-type-registration/add-document-type-registration.component';

@Component({
  selector: 'app-document-type-registration',
  templateUrl: './document-type-registration.component.html',
  styleUrls: ['./document-type-registration.component.scss']
})
export class DocumentTypeRegistrationComponent implements OnInit {
 
  displayedColumns: string[] = ['sr_no', 'Document_Type_Name','action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddDocumentTypeRegistrationComponent,{
      width:'40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
const ELEMENT_DATA: PeriodicElement[] = [
  {sr_no: 1, Document_Type_Name: '',action:'',},
];
export interface PeriodicElement {
  sr_no: number;
  Document_Type_Name: any;
  action: any;
 
}