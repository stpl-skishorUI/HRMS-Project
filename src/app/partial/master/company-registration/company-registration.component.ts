import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCompanyComponent } from './add-company/add-company.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent implements OnInit {
  companyFilterForm !: FormGroup;
  displayedColumns: string[] = ['srno', 'companyLogo', 'companyName', 'emailId', 'address', 'action'];
  dataSource = ELEMENT_DATA;
  totalCount : number = 0;
  currentPage : number = 0;
  pageSize : number = 10;
  constructor(public dialog: MatDialog, private service: CallApiService, private fb: FormBuilder, private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTableData();
    this.filterForm();
  }

  // ---------------------------------------- Filter Form Field ---------------------------------------- //
  filterForm() {
    this.companyFilterForm = this.fb.group({
      searchText: ['']
    })
  }
  // ---------------------------------------- Filter Form Field ---------------------------------------- //

  // ----------------------------------------- Mat Dialog Box ----------------------------------------- //
  addCompany(obj?: any) {
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      width: '50%',
      height :'90%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      this.getTableData();
    });
  }
  // ---------------------------------------- Mat Dialog Box ---------------------------------------- //

  // ----------------------------------------- Bind Table -------------------------------------------- // 
  getTableData() {
    this.service.setHttp('get', 'api/CompanyRegistration/GetAllCompanies?pageno='+(this.currentPage + 1)+'&pagesize=10', false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.dataSource = res.responseData;
        this.dataSource.map((cr: any)=>{
          cr.companyLogo = "http://hrmssvr.erpguru.in/Uploads" + cr.companyLogo.split('Uploads')[1];
         })
        this.totalCount = res.responseData1.pageCount;
        // console.log(res);
      }
    })
  }
  // ----------------------------------------- Bind Table -------------------------------------------- // 

  // ----------------------------------------- Filter Logic -------------------------------------------- // 
  filterRecord() {
    let record = this.companyFilterForm.value.searchText;
    // console.log(record);
    this.service.setHttp('get', 'api/CompanyRegistration/GetAllCompanies?pageno=1&pagesize=1&searchText=' + record, false, false, false, 'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.dataSource = res.responseData;
          this.dataSource.map((cr: any)=>{
           cr.companyLogo = "http://hrmssvr.erpguru.in/Uploads" + cr.companyLogo.split('Uploads')[1];
          })
          this.companyFilterForm.reset();
        }
      }
    })
  }

  onPageChanged(event:any){
    this.currentPage = event.pageIndex;
    this.getTableData();
  }
  // ----------------------------------------- Filter Logic -------------------------------------------- // 

  // onDelete(id:number){
  //   console.log(id);

  //   this.service.setHttp('delete','api/CompanyRegistration',false, id, false, "baseURL");
  //   this.service.getHttp().subscribe({
  //     next:(res:any)=>{
  //       if(res.statusCode == 200){
  //         this.getTableData();
  //       }
  //     }
  //   })
  // } 

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
  { srno: 1, company_logo: 'Hydrogen', company_name: 'shaurya', email: 'abs@gmail.com', address: 'Pune', action: '' }
];
