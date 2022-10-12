import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
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
  totalCount: any;
  currentPage: number = 0;
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
      companyId: [''],
      searchtext: [''],
    });
  }

  adddept(data?: any) {
    const dialogRef = this.dialog.open(AddDepartmentComponent, {
      width: '50%',
      data: data,
      hasBackdrop:false
    });


    dialogRef.afterClosed().subscribe((result) => {
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
  //--------------------------------------------------------------- Table Display -----------------------------------------------------------------------------//
  displayData() {
    let formData = this.filterForm.value;
    this.service.setHttp(
      'get',
      'HRMS/DepartmentType/GetAllDepartmentByPagination?pageno=' +(this.currentPage+1) +'&pagesize='+this.pageSize +'&id=' +formData.companyId +'&searchText=' +formData.searchtext,false,
      false,false,'baseURL' );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.dataSource = res.responseData;
          this.totalCount = res.responseData1.pageCount;
        }else{
          this.dataSource=[];
        }
      }
    });
  }

  //------------------------------------------------------------------------------ Company-------------------------------------------------------------------//
  getCompanyData() {
    this.service.setHttp('get','api/CommonDropDown/GetCompany',
      false,false,false,'baseURL' );
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.displayCompanyDropdown = res.responseData;
        }
      },
    });
  }

  //--------------------------------------------------------------------------Paginator--------------------------------------------------------------------------//
  pageChanged(event: any) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
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
