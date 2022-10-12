import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
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
  name: string = '';

  constructor(private fb: FormBuilder, public dialog: MatDialog, private service: CallApiService,
    private commonApi: CommonApiService, private handalErrorService: HandelErrorService) { }

  ngOnInit(): void {
    this.displayData();
    this.companyDropdown();
    this.filterMethod();
  }

  filterMethod() {
    this.filterForm = this.fb.group({
      companyId: [''],
      departmentId: [''],
      designationId: [''],
      name: ['']
    });
  }

  // ---------------------------------------- Company Dropdown ------------------------------------
  companyDropdown() {
    this.commonApi.getCompanies(0).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.companyDropdownArray = res.responseData;
        }
      }),
      // error: (error: any) => {
      //   this.handalErrorService.handelError(error.status);
      // }
    })
  }
  // ---------------------------------------- Department Dropdown ----------------------------------
  departmentDropdown() {
    let companyId = this.filterForm.value.companyId;
    this.commonApi.getDeptByCompanyId(companyId).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.departmentDropdownArray = res.responseData;
        }
      }),
      // error: (error: any) => {
      //   this.handalErrorService.handelError(error.status);
      // }
    })
  }
  // ---------------------------------------- Designation Dropdown ----------------------------------
  designationDropdown() {
    let companyId = this.filterForm.value.companyId;
    let departmentId = this.filterForm.value.departmentId;
    this.commonApi.getDesigByDeptId(companyId, departmentId).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.designationDropdownArray = res.responseData;
        }
      }),
      // error: (error: any) => {
      //   this.handalErrorService.handelError(error.status);
      // }
    })
  }
  // ---------------------------------------- Display Data / Pagination / FilterData -----------------
  displayData() {
    this.service.setHttp('get', 'HRMS/EmployeeRegister/GetEmployees?CompanyId=' + this.companyId + '&DepartmentId=' + this.departmentId + '&DesignationId=' + this.designationId + '&pageno=' + (this.currentPage + 1) + '&pagesize=10&TextSearch=' + this.name, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.dataSource = res.responseData;
          this.totalCount = res.responseData1.pageCount;
        }
        else {
          this.dataSource = [];
        }
      },
      error: (error: any) => {
          this.handalErrorService.handelError(error.status);
        }
    })
  }

  // ----------------------------------------- Filter Record -------------------------------------------
  filterData() {
    let obj = this.filterForm.value;
    this.companyId = obj.companyId ? obj.companyId : 0;
    this.departmentId = obj.departmentId ? obj.departmentId : 0;
    this.designationId = obj.designationId ? obj.designationId : 0;
    this.name = obj.name ? obj.name : '';
    this.displayData();
  }

  // ------------------------------------------ Pagination --------------------------------------------
  onClickPaginatior(data: any) {
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
