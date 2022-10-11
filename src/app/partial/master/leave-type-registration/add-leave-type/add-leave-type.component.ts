import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-leave-type',
  templateUrl: './add-leave-type.component.html',
  styleUrls: ['./add-leave-type.component.scss']
})
export class AddLeaveTypeComponent implements OnInit {
  addleaveTypeForm!: FormGroup;
  submitted = false;
  iseditbtn = false;
  editId: any;

  companyTypeResp: any;
  constructor(private fb: FormBuilder,
    private callAPIService: CallApiService,
    public dialogRef: MatDialogRef<AddLeaveTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.addleaveTypeForm = this.fb.group({
      leaveType: ['', [Validators.required, Validators.pattern('^[A-Za-z]+[A-Za-z ()-]*$')]],
      compnytype: ['', Validators.required],
      halfDayRadio: ['Yes']
    })
    this.bindCompanytype();
    this.editData();
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

  onSubmit() {
    this.submitted = true;
    let formData = this.addleaveTypeForm.value;
    if (this.addleaveTypeForm.valid) {
      console.log(this.addleaveTypeForm.value);
      const obj = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": this.iseditbtn == false ? 0 : this.editId,
        "companyId": formData.compnytype,
        "leaveName": formData.leaveType,
        "isHalfDay": formData.halfDayRadio
      }

      this.callAPIService.setHttp(this.iseditbtn == false ? 'post' : 'put', 'api/LeaveType', false, obj, false, 'baseURL');
      this.callAPIService.getHttp().subscribe({
        next: (resp: any) => {
          // this.spinner.hide();
          console.log(resp);
          if (resp.statusCode == 200) {
            alert(resp.statusMessage);
            this.dialogRef.close();
            // this.toastr.success(resp.statusMessage);
            // this.formGroupDirective.resetForm();
            // this.submitted = false;
            // this.iseditbtn = false;
            // this.bindTableData();

          } else {
            // this.toastr.error(resp.statusMessage);
          }
        },
        // error: ((error: any) => { this.error.handelError(error.statusCode) })
      })

    } else {
      console.log('error');

    }

  }

  editData() {
    this.iseditbtn = this.data.status == 'Update' ? true : false;
    this.editId = this.data.data.id;
    this.addleaveTypeForm.patchValue({
      leaveType: this.data.data.leaveName,
      compnytype: this.data.data.companyId,
      halfDayRadio: this.data.data.isHalfDay
    })
    // this.iseditbtn = true;
    console.log(this.data);

  }

  closeModal(flag?: any) {
    this.dialogRef.close(flag);
  }

}
