import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder ,FormGroupDirective} from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  @ViewChild(FormGroupDirective)


  formGroupDirective!: FormGroupDirective;
  constructor(private fb: FormBuilder,
    private callAPIService: CallApiService,
    private snackBar:MatSnackBar,
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
        if (resp.statusCode == 200) {
          this.companyTypeResp = resp.responseData;
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
          if (resp.statusCode == 200) {
            this.dialogRef.close();
            this.snackBar.open(resp.statusMessage,'ok', { 
              duration: 2000
          }); 
            // this.toastr.success(resp.statusMessage);
            // this.formGroupDirective.resetForm();

          } else {
            // this.toastr.error(resp.statusMessage);
          }
        },
        // error: ((error: any) => { this.error.handelError(error.statusCode) })
      })

    } else {
      // console.log('error');

    }
  }

  editData() {
    this.iseditbtn = this.data.status == 'Update' ? true : false;
    this.addleaveTypeForm.patchValue({
      leaveType: this.data.data?.leaveName,
      compnytype: this.data.data?.companyId,
      halfDayRadio: this.data.data?.isHalfDay
    })
    this.editId = this.data.data?.id;
  }

  clearForm() {
    this.submitted = false;
    this.formGroupDirective.resetForm();
    this.data = '';
  }

  closeModal(flag?: any) {
    this.dialogRef.close(flag);
  }

}
