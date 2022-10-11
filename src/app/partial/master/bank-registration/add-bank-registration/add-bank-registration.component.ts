import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-add-bank-registration',
  templateUrl: './add-bank-registration.component.html',
  styleUrls: ['./add-bank-registration.component.scss']
})
export class AddBankRegistrationComponent implements OnInit {
  addBankRegiForm!: FormGroup;
  submitted = false;
  iseditbtn = false;
  editId: any;
  constructor(private fb: FormBuilder,
    private callAPIService: CallApiService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddBankRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {
    this.addBankRegiForm = this.fb.group({
      bankName: ['', [Validators.required, Validators.pattern('^[A-Za-z]+[A-Za-z ()-]*$')]]
    })
    this.editData()
  }
  get f() { return this.addBankRegiForm.controls };

  onSubmit() {
    this.submitted = true;
    let formData = this.addBankRegiForm.value;
    if (this.addBankRegiForm.valid) {
      // console.log(this.addBankRegiForm.value);
      const obj = {
        "createdBy": 0,
        "modifiedBy": 0,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": this.iseditbtn == false ? 0 : this.editId,
        "bankName": formData.bankName
      }
      //if (this.iseditbtn == false) {
        // console.log('save data');
        this.callAPIService.setHttp(this.iseditbtn == false?'post':'put', 'api/BankRegistration' , false, obj, false, 'baseURL');
        this.callAPIService.getHttp().subscribe((res: any) => {
          // console.log(res);
          if (res.statusCode == 200) {
            alert(res.statusMessage);
            this.dialogRef.close();
            this.submitted = false;
            this.iseditbtn == false;

            this.addBankRegiForm.reset();
          } else {
            alert(res.statusMessage);
          
            // this.submitted = false;
            // this.iseditbtn == false
          }

        })

       //}// else {
       // console.log('update data');
        // this.callAPIService.setHttp('put', 'BankRegistration' + obj, false, false, false, 'BankRegistrationWeb');
        // this.callAPIService.getHttp().subscribe((res: any) => {
        //   console.log(res);
        //   if (res.statusCode == 200) {
        //     alert(res.statusMessage);

        //   } else {
        //     alert(res.statusMessage);

        //   }
          // this.submitted = false;
          // this.iseditbtn == false
        // })

      //}
    }
  }

  clearForm() {
    // this.iseditbtn = false;
    this.submitted = false;
    this.addBankRegiForm.reset();
    this.data = '';
  }

  editData() {
    this.iseditbtn = this.data.status == 'Update' ? true : false;
    // console.log(this.data)
    this.editId = this.data.data.id;
    // console.log(this.editId);
    this.addBankRegiForm.patchValue({
      bankName: this.data.data.bankName
    })

  }

  closeModal(flag?: any) {
    this.dialogRef.close(flag);
  }

}
