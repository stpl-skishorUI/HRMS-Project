import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-organization-registration',
  templateUrl: './organization-registration.component.html',
  styleUrls: ['./organization-registration.component.scss']
})
export class OrganizationRegistrationComponent implements OnInit {
  filterForm!: FormGroup;
  displayedColumns: string[] = ['srno', 'organization_logo', 'organization_name', 'email', 'address', 'action'];
  dataSource = ELEMENT_DATA;
  editFlag: boolean = false;
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;
  //  dataSource:any;
  constructor(public dialog: MatDialog, private service: CallApiService, public fb: FormBuilder,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.bindTable();
    this.filterMethod();
  }

  filterMethod() {
    this.filterForm = this.fb.group({
      orgName: [''],
    })
  }
  //***********Start Dialog Box*******************/
  addOrganization(obj?: any) {
    const dialogRef = this.dialog.open(AddOrganizationComponent, {
      width: '40%',
      height: '80%',
      data: obj,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.bindTable();
    });
  }
  // openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
  //     this.dialog.open(AddOrganizationComponent, {
  //       width: '50%',
  //       enterAnimationDuration,
  //       exitAnimationDuration,
  //     });

  //   }
  //***********End Dialog Box*******************/
  //***************Start Bind Table Here*******************/
  bindTable() {
   
    this.service.setHttp('get', 'HRMS/Orgnization/GetAllOrgByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10', false, false, false, 'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if(res.statusCode=='200' && res.responseData.length){
       this.dataSource = res.responseData;
       this.dataSource.map((cr: any)=>{
        cr.orgLogo = "http://hrmssvr.erpguru.in/Uploads" + cr.orgLogo.split('Uploads')[1];
       })
        this.totalCount = res.responseData1.pageCount;
       
        console.log(res);
      }else {
        this.dataSource =[];
      }
    }
    })
  }


  // getTableData() {
  //   this.service.setHttp('get', 'api/CompanyRegistration/GetAllCompanies?pageno='+(this.currentPage + 1)+'&pagesize=10', false, false, false, "baseURL");
  //   this.service.getHttp().subscribe({
  //     next: (res: any) => {
  //       this.dataSource = res.responseData;
  //       this.dataSource.map((cr: any)=>{
  //         cr.companyLogo = "http://hrmssvr.erpguru.in/Uploads" + cr.companyLogo.split('Uploads')[1];
  //        })
  //       this.totalCount = res.responseData1.pageCount;
  //       this.snackbar.open(res.statusMessage, 'Ok');
  //       console.log(res);
  //     }
  //   })
  // }




  //***************End Bind Table Here*******************/
  //******************Filter Data Submit Logic Start************************/
  filterData() {
    let orgType = this.filterForm.value.orgName;
    console.log(orgType);
    this.service.setHttp('get','HRMS/Orgnization/GetAllOrgByPagination?name=' + orgType, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.snackbar.open(res.statusMessage,'ok');
          // console.log('aaa', res);
          // let filterArray: any[] = [res.responseData];
          this.dataSource = res.responseData;
          this.filterForm.reset();
        }else {
          this.dataSource =[];
        }
      }
    })
  }
  //**********************Filter Data Submit Logic End**********************
  //***************Start Delete Logic********************/
  onDelete(id: number) {
    // let obj ={
    //   "id": id,
    //   "modifiedBy": 0,
    //   "modifiedDate": "2022-10-03T13:25:44.285Z"
    // }
    // this.service.setHttp('delete','api/Orgnization/id',false,obj,false,'baseURL');
    this.service.setHttp('delete', 'HRMS/Orgnization/DeleteOrg?id=' + id, false, false, false, 'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        this.snackbar.open(res.statusMessage,'ok');
        // this.mat.open(res.statusMessage,'ok');
        this.bindTable();
      }
    })
  }
  //****************End Delete Logic**********************/
  //************Start Handle page for Pagination***************/
  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.bindTable();
  }
  //************End Handle page for Pagination***************/
}
const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, organization_logo: '', organization_name: 'shaurya', email: 'H', address: 'Pune-11', action: '' },
];
export interface PeriodicElement {
  srno: number;
  organization_logo: string;
  organization_name: string;
  email: string;
  address: string;
  action: any;
}












//   displayedColumns: string[] = ['srno', 'organization_logo', 'organization_name', 'email','address','action'];
//   dataSource = ELEMENT_DATA;
//   constructor(public dialog: MatDialog) { }

//   ngOnInit(): void {
//   }

//   openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
//     this.dialog.open(AddOrganizationComponent, {
//       width: '50%',
//       enterAnimationDuration,
//       exitAnimationDuration,
//     });
//   }

// }
// const ELEMENT_DATA: PeriodicElement[] = [
//   {srno: 1, organization_logo: '', organization_name: 'shaurya', email: 'H',address:'Pune-11',action:''},
// ];
// export interface PeriodicElement {
//   srno: number;
//   organization_logo: string;
//   organization_name: string;
//   email: string;
//   address: string;
//   action: any;
// }
