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
  dataSource = new Array();
  editFlag: boolean = false;
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;
  orgType:string='';
  //  dataSource:any;
  constructor(public dialog: MatDialog, private service: CallApiService, public fb: FormBuilder,private snackbar:MatSnackBar) { }

  ngOnInit(): void {
    this.filterMethod();
    this.getTableData();

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
     result == 'Yes' ? this.getTableData() : '';
      // console.log(`Dialog result: ${result}`);
      // this.getTableData();
    });
  }
 //***********End Dialog Box*******************/
//***************Start Bind Table Here*******************/
  getTableData() {
    this.service.setHttp('get', 'HRMS/Orgnization/GetAllOrgByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10&name='+this.orgType, false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.dataSource = res.responseData;
          this.dataSource.map((cr: any) => {
            cr.orgLogo = "http://hrmssvr.erpguru.in/Uploads" + cr.orgLogo.split('Uploads')[1];
          })
          this.totalCount = res.responseData1.pageCount;
          // console.log(res);
        } else {
          this.dataSource = [];
        }

      }, error: (error: any) => {
        console.log("Error : ", error);
      }
    })
  }
//***************End Bind Table Here*******************/
//****************FOR FILTER SEARCH DATA SUBMIT LOGIC**************************/
  filterRecord() {
    this.orgType = this.filterForm.value.orgName;
    this.getTableData()
  }
//******************Filter Data Submit Logic Start************************/
  // filterData() {
  //   let orgType = this.filterForm.value.orgName;
  //   console.log(orgType);
  //   this.service.setHttp('get','HRMS/Orgnization/GetAllOrgByPagination?name=' + orgType, false, false, false,
  //     'baseURL');
  //   this.service.getHttp().subscribe({
  //     next: (res: any) => {
  //       if (res.statusCode == '200' && res.responseData.length) {
  //         this.snackbar.open(res.statusMessage,'ok');
  //         // console.log('aaa', res);
  //         // let filterArray: any[] = [res.responseData];
  //         this.dataSource = res.responseData;
  //         this.filterForm.reset();
  //       }else {
  //         this.dataSource =[];
  //       }
  //     }
  //   })
  // }
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
        this.getTableData();
      }
    })
  }
  //****************End Delete Logic**********************/
  //************Start Handle page for Pagination***************/
  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.getTableData();
  }
  //************End Handle page for Pagination***************/
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   { srno: 1, organization_logo: '', organization_name: 'shaurya', email: 'H', address: 'Pune-11', action: '' },
// ];
// export interface PeriodicElement {
//   srno: number;
//   organization_logo: string;
//   organization_name: string;
//   email: string;
//   address: string;
//   action: any;
// }












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
