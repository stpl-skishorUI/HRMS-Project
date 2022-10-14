import { Component, OnInit } from '@angular/core';
import { AddOrganizationComponent } from '../organization-registration/add-organization/add-organization.component';
import { MatDialog } from '@angular/material/dialog';
import { AddLeaveTypeComponent } from './add-leave-type/add-leave-type.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-leave-type-registration',
  templateUrl: './leave-type-registration.component.html',
  styleUrls: ['./leave-type-registration.component.scss']
})
export class LeaveTypeRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'LeaveType_Name', 'Half_Day', 'action'];
  // dataSource = ELEMENT_DATA;
  tableRespnse: any;
  submitted = false;
  companyTypeResp: any;
  filterleaveTypeForm!: FormGroup;
  pageNo: number = 1;
  pageSize = 10;
  length: any;

  get f() { return this.filterleaveTypeForm.controls };
  constructor(public dialog: MatDialog,
    private callAPIService: CallApiService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.filterleaveTypeForm = this.fb.group({
      companytype: [''],
      leaveType: ['']
    })
    this.leaveRegistrationData();
    this.bindCompanytype();
  }
  openDialog(status: any, data?: any) {
    let leaveData = {
      data: data,
      status: status
    }
    const dialogRef = this.dialog.open(AddLeaveTypeComponent, {
      width: '30%',
      data: leaveData,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      // this.leaveRegistrationData();
    });
  }

  bindCompanytype() {
    this.callAPIService.setHttp('GET', 'api/CommonDropDown/GetCompany', false, false, false, 'baseURL');
    this.callAPIService.getHttp().subscribe({
      next: (resp: any) => {
        if (resp.statusCode == 200) {
          this.companyTypeResp = resp.responseData;
        } else {
          // this.toastr.error(resp.statusMessage);
        }
      },
      // error: ((error: any) => { this.error.handelError(error.statusCode) })
    })
  }

  leaveRegistrationData() {
    // console.log(this.filterleaveTypeForm.value);
    this.submitted = true;
    let formData = this.filterleaveTypeForm.value;
    const obj = {
      "pageno": this.pageNo,
      "CompanyId": formData.companytype,
      "searchText": formData.leaveType,
      "pagesize":this.pageSize
    }
    this.callAPIService.setHttp('get', 'api/LeaveType/GetAllLeaveByPagination?pageno=' + obj.pageno + '&pagesize='+obj.pagesize+'&CompanyId=' + obj.CompanyId + '&searchText=' + obj.searchText, false, false, false, 'baseURL');
    this.callAPIService.getHttp().subscribe({
      next: (resp: any) => {
        // this.spinner.hide();
        if (resp.statusCode == 200) {
          this.tableRespnse = resp.responseData;
          this.length = resp.responseData1.pageCount;
          // this.toastr.success(resp.statusMessage);
          // this.formGroupDirective.resetForm();
        } else {
          this.tableRespnse = [];
          // this.toastr.error(resp.statusMessage);
        }
      },
      // error: ((error: any) => { this.error.handelError(error.statusCode) })
    })
  }

  paginationEvent(event: any) {
    this.pageNo = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.leaveRegistrationData()
  }



}



