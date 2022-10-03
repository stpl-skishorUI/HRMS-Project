import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddLeaveTypeComponent } from '../leave-type-registration/add-leave-type/add-leave-type.component';
import { AddBankBranchRegistrationComponent } from './add-bank-branch-registration/add-bank-branch-registration.component';

@Component({
  selector: 'app-bank-branch-registration',
  templateUrl: './bank-branch-registration.component.html',
  styleUrls: ['./bank-branch-registration.component.scss']
})
export class BankBranchRegistrationComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'Bank_Name', 'Branch_Name','IFSC_Code'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private api : CallApiService) {}

  ngOnInit(): void {
    this.bindTable();
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddBankBranchRegistrationComponent,{
      width:'50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  bindTable(){
    this.api.setHttp('get', 'api/BankBranchRegistration/GetAll', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) =>
        res.statusCode == 200 ? this.dataSource = res.responseData: this.dataSource = []
    })

  }
}
const ELEMENT_DATA: PeriodicElement[] = [
  {sr_no: 1, Bank_Name: '',Branch_Name:'',IFSC_Code:''},
];
export interface PeriodicElement {
  sr_no: number;
  Bank_Name: any;
  Branch_Name: any;
  IFSC_Code: any;
}
