import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDesignationComponent } from './add-designation/add-designation.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';

@Component({
  selector: 'app-designation-registration',
  templateUrl: './designation-registration.component.html',
  styleUrls: ['./designation-registration.component.scss']
})
export class DesignationRegistrationComponent implements OnInit {

  filtterForm!: FormGroup;
  organizationDropdown: any[] = [];
  companyDropdown: any[] = [];
  departmentDropdown: any[] = [];
  filtterOrgId!: number;
  filtterCompanyId!: number;
  filtterDepartmentId!: number;
  filtterDesignationText: string = '';
  totalCount: any;
  currentPage: number = 0;

  constructor(public dialog: MatDialog, private service: CallApiService, private formBuilder: FormBuilder,
    private snack: MatSnackBar, private commomApi: CommonApiService, private handalErrorService: HandelErrorService,
    public validation: ValidationPatternService) { }

  ngOnInit(): void {
    this.fillterFormData();
    this.getTableData();
    this.getOrganization();
  }

  //-----------------------------------Filter Data------------------------------------------//
  fillterFormData() {
    this.filtterForm = this.formBuilder.group({
      filtterOrganization: [''],
      filtterCompany: [''],
      filtterDepartment: [''],
      filtterDesignation: ['']
    })
  }
  fillterOnSubmit() {
    let obj = this.filtterForm.value
    this.filtterOrgId = obj.filtterOrganization;
    this.filtterCompanyId = obj.filtterCompany;
    this.filtterDepartmentId = obj.filtterDepartment;
    this.filtterDesignationText = obj.filtterDesignation;

    this.service.setHttp('get', 'HRMS/Designation/GetAllDesignationByPagination?pageno=' + (this.currentPage + 1) + '&pagesize=10&oId=' + this.filtterOrgId + '&cId=' + this.filtterCompanyId + '&dId=' + this.filtterDepartmentId + '&searchText=' + this.filtterDesignationText, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == 200 && res.responseData.length) {
          this.dataSource = res.responseData;
          this.totalCount = res.responseData1.pageCount;
        } else {
          this.dataSource = [];
          this.handalErrorService.handelError(res.statusCode);
        }
      }, error: (error: any) => {
        this.handalErrorService.handelError(error.status);
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
      data: obj,
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      result == 'Yes' ? this.getTableData() : '';

      // console.log(`Dialog result: ${result}`)
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
        if (res.statusCode == 200 && res.responseData.length) {
          this.dataSource = res.responseData;
          this.totalCount = res.responseData1.pageCount;
        } else {
          this.dataSource = [];
          this.handalErrorService.handelError(res.statusCode);
        }
      }, error: (error: any) => {
        this.handalErrorService.handelError(error.status);
      }
    })
  }
  //-----------------------------------Table Binding------------------------------------------//

  //-----------------------------------Drop-Down------------------------------------------//

  getOrganization() {
    this.commomApi.getOrganization().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.organizationDropdown = res.responseData;
        }
      }),
      error: (error: any) => {
      }
    })
  }
  getCompanyDropdown() {
    let orgId = this.filtterForm.value.filtterOrganization;
    this.commomApi.getCompanies(orgId).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.companyDropdown = res.responseData;
        }
      }),
      error: (error: any) => {
      }
    })
  }
  getDepartmentDropdown() {
    let cid = this.filtterForm.value.filtterCompany;
    this.commomApi.getDeptByCompanyId(cid).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.departmentDropdown = res.responseData;
        }
      }),
      error: (error: any) => {
      }
    })
  }
  //-----------------------------------Drop-Down------------------------------------------//

  //-----------------------------------Clear-Form------------------------------------------//
  clearForm(formControlName: any) {
    if (formControlName == 'filtterOrganization') {
      this.filtterForm.controls['filtterCompany'].setValue('');
      this.filtterForm.controls['filtterDepartment'].setValue('');
      this.filtterForm.controls['filtterDesignation'].setValue('');
    } else if (formControlName == 'filtterCompany') {
      this.filtterForm.controls['filtterDepartment'].setValue('');
      this.filtterForm.controls['filtterDesignation'].setValue('');
    } else if (formControlName == 'filtterDepartment') {
      this.filtterForm.controls['filtterDesignation'].setValue('');
    }
  }
}
//-----------------------------------Clear-Form------------------------------------------//
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


