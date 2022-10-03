import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['srno', 'companyLogo','companyName', 'emailId', 'address','action'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog, private service : CallApiService) {}

  ngOnInit(): void {
    this.getTableData();
  }

  addCompany() {
    const dialogRef = this.dialog.open(AddCompanyComponent,{
      width: '50%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      // this.getTableData();
    });
  }

  
getTableData(){
  this.service.setHttp('get','api/CompanyRegistration/GetAllCompanies', false, false, false, "baseURL");
  this.service.getHttp().subscribe({
    next:(res:any)=>{
      this.dataSource = res.responseData;
      // console.log(res);
    }
  })
}


  
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
