import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';

@Component({
  selector: 'app-add-company-bank-registration',
  templateUrl: './add-company-bank-registration.component.html',
  styleUrls: ['./add-company-bank-registration.component.scss']
})
export class AddCompanyBankRegistrationComponent implements OnInit {
  companyBankRegistrationForm!: FormGroup;

  organizationNameArray = new Array();
  campanyNameArray = new Array();
  bankNameArray = new Array();
  branchNameArray = new Array();
  accountTypeArray = ['saving', 'current'];
  editFlag: boolean = false;

  constructor(private api: CallApiService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCompanyBankRegistrationComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar, private commonApi: CommonApiService) { }

  ngOnInit(): void {
    this.formData();
    this.getOrganizationNameDropdown()
    this.getBankNameDropdown();
    this.data ? this.editProfile() : '';
  }

  formData() {
    this.companyBankRegistrationForm = this.fb.group({
      "organizationId": [this.data ? this.data.organizationId : '', Validators.required],
      "companyId": [this.data ? this.data.companyId : '', Validators.required],
      "bankId": [this.data ? this.data.bankId : '', Validators.required],
      "branchId": [this.data ? this.data.branchId : '', Validators.required],
      "accountNo": [this.data ? this.data.accountNo : '', [Validators.required, Validators.pattern("^[0-9]*$")]],
      "accountType": [this.data ? this.data.accountType : '', Validators.required],
      "id": this.data ? this.data.id : 0,
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "createdDateFormatdate": new Date(),
      "modifiedDateFormatdate": new Date(),
    })
  }

  get formFiledControl() { return this.companyBankRegistrationForm.controls}

  // --------------------------------------Dropdown Methods Start----------------------------------------

  getOrganizationNameDropdown() {
    this.commonApi.getOrganization().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.organizationNameArray = res.responseData;
          this.data ? this.getCampanyNameDropdown():''
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  getCampanyNameDropdown() {
    let id = this.companyBankRegistrationForm.value.organizationId;
    this.commonApi.getCompanies(id).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.campanyNameArray = res.responseData;
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  getBankNameDropdown() {
    this.commonApi.getBanks().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.bankNameArray = res.responseData;
          this.data ? this.getBranchNameDropdown():''; 
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }

  getBranchNameDropdown() {
    let id = this.companyBankRegistrationForm.value.bankId;
    this.commonApi.getBranchesByBankId(id).subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.branchNameArray = res.responseData;
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }
  // --------------------------------------Dropdown Methods End----------------------------------------

  // on Edit Profile Patch Value to the Form
  editProfile() {
    this.editFlag = true;
  }

  clearForm(id: string) {
    if (id == 'organization') {
      this.companyBankRegistrationForm.controls['bankId'].reset();
      this.companyBankRegistrationForm.controls['branchId'].reset();
      this.companyBankRegistrationForm.controls['accountType'].reset();
      this.companyBankRegistrationForm.controls['accountNo'].reset();
    } else if (id == 'company') {
      this.companyBankRegistrationForm.controls['bankId'].reset();
      this.companyBankRegistrationForm.controls['branchId'].reset();
      this.companyBankRegistrationForm.controls['accountType'].reset();
      this.companyBankRegistrationForm.controls['accountNo'].reset();
    } else if (id == 'bank') {
      this.companyBankRegistrationForm.controls['accountNo'].reset();
      this.companyBankRegistrationForm.controls['accountType'].reset();
    } else if (id == 'branch') {
      this.companyBankRegistrationForm.controls['accountNo'].reset();
      this.companyBankRegistrationForm.controls['accountType'].reset();
    } else if (id == 'accountType') {
      this.companyBankRegistrationForm.controls['accountNo'].reset();
    }
  }

  // On Submit
  onSubmit() {
    let obj = this.companyBankRegistrationForm.value;
    this.api.setHttp(this.editFlag ? 'put' : 'post', this.editFlag ? 'api/CompanyBankAccount/UpdateCompanyBankAccountDetails' : 'api/CompanyBankAccount/AddCompanyBankAccountDetails', false, obj, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode == '200') {
          this.dialogRef.close('yes');
          this.snackBar.open(res.statusMessage, 'ok', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration : 2000
          });
        }
      }),
      error: (error: any) => {
        console.log("Error is", error);
      }
    })
  }
}
