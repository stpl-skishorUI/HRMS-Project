import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddSalaryTypeComponent } from './add-salary-type/add-salary-type.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-salary-type-registration',
  templateUrl: './salary-type-registration.component.html',
  styleUrls: ['./salary-type-registration.component.scss']
})
export class SalaryTypeRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'Company_Name', 'Salary_Component', 'IsPercentage', 'Value', 'action'];
  dataSource = ELEMENT_DATA;
  

  constructor(public dialog: MatDialog, private service: CallApiService,private snack:MatSnackBar) { }

  ngOnInit(): void {
    this.getAllTableData();
  }
  openDialog(ele?: any) {
    const dialogRef = this.dialog.open(AddSalaryTypeComponent, {
      width: '30%',
      data: ele
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllTableData();
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllTableData() {
    this.service.setHttp('get', 'api/SalaryType/GetList', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        console.log("res",res);
        if (res.statusCode == 200) {
          this.snack.open(res.statusMessage,'Ok');
          this.dataSource = res.responseData;

        }
      }
    })

  }



}
const ELEMENT_DATA: PeriodicElement[] = [
  { sr_no: 1, Company_Name: '', Salary_Component: '', IsPercentage: '', Value: '', action: '' },
];
export interface PeriodicElement {
  sr_no: number;
  Company_Name: any;
  Salary_Component: any;
  IsPercentage: any;
  Value: any;
  action: any;
}


