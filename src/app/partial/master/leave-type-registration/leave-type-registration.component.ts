import { Component, OnInit } from '@angular/core';
import { AddOrganizationComponent } from '../organization-registration/add-organization/add-organization.component';
import { MatDialog } from '@angular/material/dialog';
import { AddLeaveTypeComponent } from './add-leave-type/add-leave-type.component';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-leave-type-registration',
  templateUrl: './leave-type-registration.component.html',
  styleUrls: ['./leave-type-registration.component.scss']
})
export class LeaveTypeRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'LeaveType_Name', 'Half_Day', 'action'];
  // dataSource = ELEMENT_DATA;
  tableRespnse: any;
  companyTypeResp:any;
  filterleaveTypeForm!:FormGroup;
  pageNo: number = 1;
  pageSize = 10;
  length: any;

  constructor(public dialog: MatDialog,
    private callAPIService: CallApiService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filterleaveTypeForm=this.fb.group({
      companytype:[''],
      leaveType:['']
    })
    this.leaveRegistrationData();
    this.bindCompanytype();
  }
  openDialog(status: any, data?: any) {
    console.log(data);
    let leaveData={
      data:data,
      status:status
    }
    const dialogRef = this.dialog.open(AddLeaveTypeComponent, {
      width: '30%',
      data:leaveData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.leaveRegistrationData();
      // this.dialogRef.close();
    });
  }

  bindCompanytype() {
    this.callAPIService.setHttp('GET', 'api/CommonDropDown/GetCompany', false, false, false, 'baseURL');
    this.callAPIService.getHttp().subscribe({
      next: (resp: any) => {
        console.log(resp);
        if (resp.statusCode == 200) {
          this.companyTypeResp = resp.responseData;
          console.log(this.companyTypeResp);
        } else {
          // this.toastr.error(resp.statusMessage);
        }
      },
      // error: ((error: any) => { this.error.handelError(error.statusCode) })
    })
  }

  leaveRegistrationData() {
    let formData=this.filterleaveTypeForm.value;
    const obj = {
      "pageno": this.pageNo,
      "CompanyId":formData.companytype,
      "searchText":formData.leaveType,
    }
    this.callAPIService.setHttp('get', 'api/LeaveType/GetAllLeaveByPagination?pageno=' + obj.pageno + '&pagesize=10&CompanyId='+obj.CompanyId+'&searchText='+obj.searchText, false, false, false, 'baseURL');
    this.callAPIService.getHttp().subscribe({
      next: (resp: any) => {
        // this.spinner.hide();
        console.log(resp);
        if (resp.statusCode == 200) {
          this.tableRespnse = resp.responseData;
          this.length = resp.responseData1.pageCount;
          // this.toastr.success(resp.statusMessage);
          // this.formGroupDirective.resetForm();
          // this.submitted = false;
          // this.iseditbtn = false;
          // this.bindTableData();

        } else {
          this.tableRespnse = [];
          // this.toastr.error(resp.statusMessage);
        }
      },
      // error: ((error: any) => { this.error.handelError(error.statusCode) })
    })
  }

  paginationEvent(event: any) {
    console.log(event);
    this.pageNo = event.pageIndex + 1;
    this.leaveRegistrationData()
  }

  

}



