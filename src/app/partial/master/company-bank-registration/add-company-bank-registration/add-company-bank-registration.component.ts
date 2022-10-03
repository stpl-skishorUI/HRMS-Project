import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-add-company-bank-registration',
  templateUrl: './add-company-bank-registration.component.html',
  styleUrls: ['./add-company-bank-registration.component.scss']
})
export class AddCompanyBankRegistrationComponent implements OnInit {
  companyBankRegistrationForm!: FormGroup;
  campanyNameArray = new Array();
  bankNameArray = new Array();
  branchNameArray = new Array();
  accountTypeArray = ['saving','current'];
  editFlag:boolean = false
  constructor(private api: CallApiService, private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddCompanyBankRegistrationComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    
    this.formData();
    this.getCampanyNameDropdown();
    this.getBankNameDropdown();
    this.getBranchNameDropdown();
    this.data ?  this.editProfile():'';
   
  }

  formData() {
    this.companyBankRegistrationForm = this.fb.group({
      "companyId": [''],
      "bankId": [''],
      "branchId": [''],
      "accountNo": [''],
      "accountType": [''],
      "id": 0,
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": "0001-01-01T00:00:00",
      "modifiedDate": "0001-01-01T00:00:00",
      "isDeleted": false,
      "createdDateFormatdate": "0001-01-01 12:00:00 AM",
      "modifiedDateFormatdate": "0001-01-01 12:00:00 AM"
    })
  }


  // --------------------------------------Dropdown Start----------------------------------------

  getCampanyNameDropdown() {
    this.api.setHttp('get', 'api/CommonDropDown/GetCompany', false, false, false, 'baseURL');
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
        }
      })
    })
  }

  getBranchNameDropdown() {
    this.api.setHttp('get', 'api/CommonDropDown/GetBankBranchRegistration', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
        if (res.statusCode === '200' && res.responseData.length) {
          this.branchNameArray = res.responseData;
        }
      })
    })
  }
  // --------------------------------------Dropdown End----------------------------------------

  editProfile(){
    this.editFlag = true;
    let obj = this.data
  
     this.companyBankRegistrationForm.patchValue({
      "companyId": obj.companyName,
      "bankId": obj.bankName,
      "branchId": obj.branchName,
      "accountNo": obj.accountNo,
      "accountType": obj.accountType,
     });
     this.getCampanyNameDropdown()
   
  }

  onSubmit() {
    let obj = this.companyBankRegistrationForm.value;
    console.log(obj);
    this.api.setHttp('post', 'api/CompanyBankAccount/AddCompanyBankAccountDetails', false, obj, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: ((res: any) => {
       console.log(res);       
      })
    })
  }
}
