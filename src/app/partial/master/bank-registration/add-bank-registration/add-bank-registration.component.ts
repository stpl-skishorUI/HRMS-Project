import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder,FormGroupDirective } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-bank-registration',
  templateUrl: './add-bank-registration.component.html',
  styleUrls: ['./add-bank-registration.component.scss']
})
export class AddBankRegistrationComponent implements OnInit {
  addBankRegiForm!: FormGroup;
  companyTypeResp: any;
  submitted = false;
  iseditbtn = false;
  editId: any;

  @ViewChild(FormGroupDirective)
  formGroupDirective!: FormGroupDirective;

  constructor(private fb: FormBuilder,
    private callAPIService: CallApiService,
    public dialog: MatDialog,
    private snackBar:MatSnackBar,
    public dialogRef: MatDialogRef<AddBankRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.addBankRegiForm = this.fb.group({
      bankName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+[A-Za-z ()-]*$')]],
      companyId: ['', [Validators.required]]
    })
    this.bindCompanytype();
    this.editData();

  }
  get f() { return this.addBankRegiForm.controls };

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
    let formData = this.addBankRegiForm.value;
    if (this.addBankRegiForm.valid) {
      const obj = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": this.iseditbtn == false ? 0 : this.editId,
        "companyId":formData.companyId,
        "bankName": formData.bankName
      } 
      this.callAPIService.setHttp(this.iseditbtn == false ? 'post' : 'put', 'api/BankRegistration', false, obj, false, 'baseURL');
      this.callAPIService.getHttp().subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.snackBar.open(res.statusMessage,'ok', { 
            duration: 2000
        }); 
          this.dialogRef.close();
          this.submitted = false;
          this.iseditbtn == false;
          this.addBankRegiForm.reset();
        } else {
          this.snackBar.open(res.statusMessage,'ok', { 
            duration: 2000
        });
        }
      })
    }
  }

  clearForm() {
    this.submitted = false;
    this.formGroupDirective.resetForm();
    this.data = '';
  }

  editData() {
    this.iseditbtn = this.data.status == 'Update' ? true : false;
    this.editId = this.data.data?.id;
    this.addBankRegiForm.patchValue({
      bankName: this.data.data?.bankName,
      companyId: this.data.data?.companyId,
    })
  }

  closeModal(flag?: any) {
    this.dialogRef.close(flag);
  }

}
