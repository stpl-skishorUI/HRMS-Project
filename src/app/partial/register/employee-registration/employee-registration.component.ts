import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddEmployeeDetailsComponent } from './add-employee-details/add-employee-details.component';


@Component({
  selector: 'app-employee-registration',
  templateUrl: './employee-registration.component.html',
  styleUrls: ['./employee-registration.component.scss']
})
export class EmployeeRegistrationComponent implements OnInit {

  companyDropdownArray: any = new Array();
  departmentDropdownArray: any = new Array();
  designationDropdownArray: any = new Array();
  filterForm!: FormGroup;
  pageSize = 10;
  totalCount!: number;
  currentPage: number = 0;
  companyId: number = 0;
  departmentId: number = 0;
  designationId: number = 0;

  constructor(private fb: FormBuilder, public dialog: MatDialog, private service: CallApiService) { }

  ngOnInit(): void {
    this.displayData();
    this.companyDropdown();
    // this.departmentDropdown();
    // this.designationDropdown();
    this.filterMethod();
    // this.filterData();
  }

  filterMethod() {
    this.filterForm = this.fb.group({
      companyId: [''],
      departmentId: [''],
      designationId: ['']
    });
  }

  // ---------------------------------------- Company Dropdown ------------------------------------
  companyDropdown() {
    this.service.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId=0', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          // console.log(res);
          this.companyDropdownArray = res.responseData;
        }
      }
    })
  }
  // ---------------------------------------- Department Dropdown ----------------------------------
  departmentDropdown() {
    let companyId = this.filterForm.value.companyId;
    this.service.setHttp('get', 'api/CommonDropDown/GetDepartment?CompanyId=' + companyId + '', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          // console.log(res);
          this.departmentDropdownArray = res.responseData;
        }
      }
    })
  }
  // ---------------------------------------- Designation Dropdown ----------------------------------
  designationDropdown() {
    let companyId = this.filterForm.value.companyId;
    let departmentId = this.filterForm.value.departmentId;
    this.service.setHttp('get', 'api/CommonDropDown/GetDesignation?CompanyId=' + companyId + '&DepartmentId=' + departmentId + '', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          // console.log(res);
          this.designationDropdownArray = res.responseData;
        }
      }
    })
  }

  // ---------------------------------------- Display Data / Pagination / FilterData -----------------
  displayData() {
    this.service.setHttp('get', 'HRMS/EmployeeRegister/GetEmployees?CompanyId=' + this.companyId + '&DepartmentId=' + this.departmentId + '&DesignationId=' + this.designationId + '&pageno=' + (this.currentPage + 1) + '&pagesize=10&TextSearch=', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          // console.log(res);
          this.dataSource = res.responseData;
          this.totalCount = res.responseData1.pageCount;
        }
        else {
          this.dataSource = [];
        }
      }
    })
  }

  // ----------------------------------------- Filter Record -------------------------------------------
  filterData() {
    let obj = this.filterForm.value;
    this.companyId = obj.companyId ? obj.companyId : 0;
    this.departmentId = obj.departmentId ? obj.departmentId : 0;
    this.designationId = obj.designationId ? obj.designationId : 0;
    this.displayData();
  }

  // ------------------------------------------ Pagination --------------------------------------------
  onClickPaginatior(data: any) {
    // this.pageSize = data.pageSize;
    this.currentPage = data.pageIndex;
    this.displayData();
  }

  secondFormGroup = this.fb.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  displayedColumns: string[] = ['srno', 'emp_code', 'emp_name', 'company', 'department', 'designation', 'action'];
  dataSource = ELEMENT_DATA;

  addempdetails(data?: any) {
    const dialogRef = this.dialog.open(AddEmployeeDetailsComponent, {
      width: '70%',
      height: '97%',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.displayData();
    });
  }

  clearForm(formControlName: any) {
    if (formControlName.value == this.filterForm.value.companyId) {
      this.filterForm.controls['departmentId'].setValue('');
      this.filterForm.controls['designationId'].setValue('');
    } else if (formControlName.value == this.filterForm.value.departmentId) {
      this.filterForm.controls['designationId'].setValue('');
    }
  }
}


export interface PeriodicElement {
  srno: number;
  emp_code: number;
  emp_name: string;
  company: string;
  department: string;
  designation: string;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { srno: 1, emp_code: 12214, emp_name: 'Ram Chavan', company: 'H', department: 'Software Development', designation: 'Manager', action: '' }
];
