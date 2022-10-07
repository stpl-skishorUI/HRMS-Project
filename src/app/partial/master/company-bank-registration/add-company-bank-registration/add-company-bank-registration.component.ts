import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';

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
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.formData();
    this.getOrganizationNameDropdown()
    // this.getCampanyNameDropdown();
    this.getBankNameDropdown();
    this.data ? this.editProfile() : '';
  }

  formData() {
    this.companyBankRegistrationForm = this.fb.group({
      "organizationId":[this.data ? this.data.organizationId :'',Validators.required],
      "companyId":[this.data ? this.data.companyId :'',Validators.required],
      "bankId": [this.data ? this.data.bankId :'',Validators.required],
      "branchId": [this.data ? this.data.branchId :'',Validators.required],
      "accountNo": [this.data ? this.data.accountNo :'',Validators.required],
      "accountType": [this.data ? this.data.accountType :'',Validators.required],
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

  get formFiledControl(){return this.companyBankRegistrationForm.controls}

  // --------------------------------------Dropdown Methods Start----------------------------------------

  getOrganizationNameDropdown() {
    this.api.setHttp('get', 'api/CommonDropDown/GetOrganization', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200' && res.responseData.length) {
          this.organizationNameArray = res.responseData;
          this.data ? this.getCampanyNameDropdown() :''
        }
      })
    })
  }



  getCampanyNameDropdown() {
    let id = this.companyBankRegistrationForm.value.organizationId
    this.api.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId=' + id, false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200' && res.responseData.length) {
          this.campanyNameArray = res.responseData;
        }
      })
    })
  }

  getBankNameDropdown() {
    this.api.setHttp('get', 'api/CommonDropDown/GetBankRegistration', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200' && res.responseData.length) {
          this.bankNameArray = res.responseData;
           this.data ? this.getBranchNameDropdown() :'';
        }
      })
    })
  }

  getBranchNameDropdown() {
    let id = this.companyBankRegistrationForm.value.bankId;
    // console.log(id);
    this.api.setHttp('get', 'api/CommonDropDown/GetBankBranchRegistration?BankId='+id, false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200' && res.responseData.length) {
          this.branchNameArray = res.responseData;
        }
      })
    })
  }
  // --------------------------------------Dropdown Methods End----------------------------------------

  // on Edit Profile Patch Value to the Form

  editProfile() {
    this.editFlag = true;
    // this.getBranchNameDropdown();   
  }

  // on Reset Button
  onReset() {
    this.editFlag = false;
    this.companyBankRegistrationForm.reset();
  }

  clearForm(id:string) {
    if (id == 'organization') {
      this.companyBankRegistrationForm.controls['bankId'].setValue('');
      this.companyBankRegistrationForm.controls['branchId'].setValue('');
      this.companyBankRegistrationForm.controls['accountType'].setValue('');
      this.companyBankRegistrationForm.controls['accountNo'].setValue('');
    }else if (id == 'company') {
      this.companyBankRegistrationForm.controls['bankId'].setValue('');
      this.companyBankRegistrationForm.controls['branchId'].setValue('');
      this.companyBankRegistrationForm.controls['accountType'].setValue('');
      this.companyBankRegistrationForm.controls['accountNo'].setValue('');
    }else if (id == 'bank') {
      this.companyBankRegistrationForm.controls['accountNo'].setValue('');
      this.companyBankRegistrationForm.controls['accountType'].setValue('');
    }else if (id == 'branch') {
      this.companyBankRegistrationForm.controls['accountNo'].setValue('');
      this.companyBankRegistrationForm.controls['accountType'].setValue('');
    }else if (id == 'accountType') {
      this.companyBankRegistrationForm.controls['accountNo'].setValue('');
    }
  }

  // On Submit
  onSubmit() {
    let obj = this.companyBankRegistrationForm.value;
    if(!this.editFlag){
      this.api.setHttp('post', 'api/CompanyBankAccount/AddCompanyBankAccountDetails', false, obj, false, 'baseURL');
      this.api.getHttp().subscribe({
        next: ((res: any) => {
          if(res.statusCode === '200'){
             this.dialogRef.close();          
            this.snackBar.open(res.statusMessage ,'ok',{
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        })
      })
    }else{
      this.api.setHttp('put', 'api/CompanyBankAccount/UpdateCompanyBankAccountDetails', false, obj, false, 'baseURL');
      this.api.getHttp().subscribe({
        next: ((res: any) => {
          if(res.statusCode === '200'){
             this.dialogRef.close();          
            this.snackBar.open(res.statusMessage ,'ok',{
              horizontalPosition: 'right',
              verticalPosition: 'top'
            });
          }
        })
      })
    }
    
  }
}
