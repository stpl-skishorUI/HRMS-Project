import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddOrganizationComponent } from './add-organization/add-organization.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';
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
  orgType: string = '';
  constructor(public dialog: MatDialog, private service: CallApiService, public fb: FormBuilder, 
    private snackbar: MatSnackBar,private error:HandelErrorService,public validationservice:ValidationPatternService) { }
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
      // height: '80%',
      data: obj,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      result == 'Yes' ? this.getTableData() : '';//when we click on * button but not add value then didn't call getTableData()
    });
  }
  //***********End Dialog Box*******************/
  //***************Start Bind Table Here*******************/
  getTableData() {
    this.service.setHttp('get', 'HRMS/Orgnization/GetAllOrgByPagination?pageno=' + (this.currentPage + 1) + '&pagesize='+ this.pageSize+'&name=' + this.orgType, false, false, false, "baseURL");
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
          this.dataSource = res.responseData;
          this.dataSource.map((cr: any) => {
            cr.orgLogo = "http://hrmssvr.erpguru.in/Uploads" + cr.orgLogo.split('Uploads')[1];
          })
          this.totalCount = res.responseData1.pageCount;
        } else {
          this.dataSource = [];
        }
      }, error: (error: any) => {
        // console.log("Error : ", error);
        this.error.handelError(error.statusCode);
      }
    })
  }
  //***************End Bind Table Here*******************/
  //****************FOR FILTER SEARCH DATA SUBMIT LOGIC Start**************************/
  filterRecord() {
    this.orgType = this.filterForm.value.orgName;
    this.getTableData()
  }
  //******************FILTER SEARCH DATA SUBMIT LOGIC End************************/
  //***************Start Delete Logic********************/
  onDelete(id: number) {
    this.service.setHttp('delete', 'HRMS/Orgnization/DeleteOrg?id=' + id, false, false, false, 'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200) {
        this.snackbar.open(res.statusMessage, 'ok');
        this.getTableData();
      }
    }, error: (error: any) => {
      // console.log("Error : ", error);
      this.error.handelError(error.statusCode);
    }
    })
  }
  //****************End Delete Logic**********************/
  //************Start Handle page for Pagination***************/
  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getTableData();
  }
  //************End Handle page for Pagination***************/
}













