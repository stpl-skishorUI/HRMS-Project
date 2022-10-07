import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDesignationComponent } from './add-designation/add-designation.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-designation-registration',
  templateUrl: './designation-registration.component.html',
  styleUrls: ['./designation-registration.component.scss']
})
export class DesignationRegistrationComponent implements OnInit {

  filtterForm!: FormGroup;
  companyDropdown: any[] = [];
  departmentDropdown: any[] = [];
  designationDropdown: any[] = [];
  filtterCompanyId!: number;
  filtterDepartmentId!: number;
  filtterDesignationText: string = '';
  totalCount: any;
  currentPage: number = 0;

  constructor(public dialog: MatDialog, private service: CallApiService, private formBuilder: FormBuilder, private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.getTableData();
    this.getCompanyDropdown();
    this.fillterFormData();
  }

  //-----------------------------------Filter Data------------------------------------------//
  fillterFormData() {
    this.filtterForm = this.formBuilder.group({
      filtterCompany: [''],
      filtterDepartment: [''],
      filtterDesignation: ['']
    })
  }
  fillterOnSubmit() {
    let obj = this.filtterForm.value
    this.filtterCompanyId = obj.filtterCompany;
    this.filtterDepartmentId = obj.filtterDepartment;
    this.filtterDesignationText = obj.filtterDesignation;
   
    // http://hrmssvr.erpguru.in/HRMS/Designation/GetAllDesignationByPagination?pageno=1&pagesize=10&oId=1&cId=1&dId=1&searchText=hhhh
    this.service.setHttp('get', 'HRMS/Designation/GetAllDesignationByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10&oId=1&cId=' + this.filtterCompanyId + '&dId=' + this.filtterDepartmentId + '&searchText=' + this.filtterDesignationText, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        console.log("res",res);
        
        this.dataSource = res.responseData;
     
        // this.snack.open(res.statusMessage,"ok");
        this.totalCount = res.responseData1.pageCount;
      }
    })

  }
  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.getTableData();
  }
  //-----------------------------------Filter Data------------------------------------------//
  addDesignation(obj?: any) {
    const dialogRef = this.dialog.open(AddDesignationComponent, {
      width: '30%',
      data: obj
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTableData();
      console.log(`Dialog result: ${result}`)
    });
  }

  displayedColumns: string[] = ['srno', 'designation_name', 'department_name', 'company', 'action'];
  dataSource = ELEMENT_DATA;

  //-----------------------------------Table Binding------------------------------------------//
  getTableData() {
    this.service.setHttp('get', 'HRMS/Designation/GetAllDesignationByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        console.log("getTableData called", res);
        this.dataSource = res.responseData;
        console.log(this.dataSource);
        // this.snack.open(res.statusMessage,"ok");
        this.totalCount = res.responseData1.pageCount;
      }
    })
  }
  //-----------------------------------Table Binding------------------------------------------//

  //-----------------------------------Drop-Down------------------------------------------//
  getCompanyDropdown() {
    this.service.setHttp('get', 'api/CommonDropDown/GetCompany', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200 && res.responseData.length) {
          this.companyDropdown = res.responseData;
        }
      }
    })
  }
  getDepartmentDropdown() {
    let cid = this.filtterForm.value.filtterCompany;
    this.service.setHttp('get', 'api/CommonDropDown/GetDepartment?CompanyId=' + cid, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200 && res.responseData.length) {
          this.departmentDropdown = res.responseData;
        }
        this.getDesignationDropdown();
      }
    })
  }
  getDesignationDropdown() {
    this.service.setHttp('get', 'api/CommonDropDown/GetDesignation', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200 && res.responseData.length) {
          this.designationDropdown = res.responseData;
        }
      }
    })
  }
  //-----------------------------------Drop-Down------------------------------------------//

}
export interface PeriodicElement {
  srno: number;
  designation_name: string;
  department_name: string;
  company: string;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, designation_name: 'Html Designer', department_name: 'Software Development', company: 'shaurya', action: '' }
];


