import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddDepartmentComponent } from './add-department/add-department.component';

@Component({
  selector: 'app-department-registration',
  templateUrl: './department-registration.component.html',
  styleUrls: ['./department-registration.component.scss'],
})
export class DepartmentRegistrationComponent implements OnInit {
  filterForm!: FormGroup;
  displayCompanyDropdown = new Array();
  totalRows: any;
  pageNo = 1;
  pageSize = 10;
  searchtext!: string;
  companyId!: number;

  constructor(
    public dialog: MatDialog,
      private service: CallApiService,
      private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.defaultForm();
    this.displayData();
    this.getCompanyData();
  }

  defaultForm() {
    this.filterForm = this.fb.group({
      companyId: ['', [Validators.required]],
      searchtext: [''],
    });
  }

  adddept(data?: any) {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '50%',
      data: data,
    });

    console.log(data);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.displayData();
      dialogRef.close();
    });
  }

  displayedColumns: string[] = [
    'srno',
    'companyName',
    'departmentName',
    'action',
  ];
  dataSource: any[] = [];
  //--------------------------------------------------------------- Table Display ------------------------------------------------------------------------------------
  displayData() {
    let formData = this.filterForm.value;
    this.service.setHttp(
      'get',
      'HRMS/DepartmentType/GetAllDepartmentByPagination?pageno=' +this.pageNo +'&pagesize=' +this.pageSize +'&id=' +formData.companyId +'&searchText=' +formData.searchtext,false,
      false,false,'baseURL' );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          // console.log(res);
          this.dataSource = res.responseData;
        }
      },
    });
  }

  //------------------------------------------------------- Company-------------------------------------------------------------------
  getCompanyData() {
    this.service.setHttp('get','api/CommonDropDown/GetCompany',
      false,false,false,'baseURL' );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        // console.log(res);
        if (res.statusCode == '200') {
          this.displayCompanyDropdown = res.responseData;
        }
      },
    });
  }

  //--------------------------------------------------------------Paginator-----------------------------------------------------------------
  pageChanged(pg: any) {
    this.pageNo = pg.pageIndex + 1;
    this.displayData();
  }
}
export interface PeriodicElement {
  srno: number;
  company_name: string;
  department_name: string;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {
    srno: 1,
    company_name: 'Hydrogen',
    department_name: 'designing',
    action: '',
  },
];
