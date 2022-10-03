import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddDepartmentComponent } from './add-department/add-department.component';

@Component({
  selector: 'app-department-registration',
  templateUrl: './department-registration.component.html',
  styleUrls: ['./department-registration.component.scss']
})
export class DepartmentRegistrationComponent implements OnInit {

  constructor(public dialog: MatDialog,private service: CallApiService) {}

  ngOnInit(): void {
    this.displayData();
  }

  adddept(data?:any) {
    const dialogRef = this.dialog.open(AddDepartmentComponent,{
      width: '50%',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.displayData();
      // this.dialogRef.close();
    });
  }

  displayedColumns: string[] = ['srno', 'companyName', 'departmentName','action'];
  dataSource = ELEMENT_DATA;

  displayData() {
    this.service.setHttp('get', 'api/DepartmentType/GetDepartmentRegistration', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          // console.log(res);
          this.dataSource = res.responseData;
        }
      }
    })
  }
}
export interface PeriodicElement {
  srno: number;
  company_name: string;
  department_name: string;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, company_name: 'Hydrogen', department_name: 'designing',action:''}
];


