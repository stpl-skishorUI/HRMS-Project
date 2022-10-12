import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';

@Component({
  selector: 'app-add-document-type-registration',
  templateUrl: './add-document-type-registration.component.html',
  styleUrls: ['./add-document-type-registration.component.scss']
})
export class AddDocumentTypeRegistrationComponent implements OnInit {
  docTypeRegistrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: CallApiService, 
    public dialog: MatDialog, public dialogRef: MatDialogRef<AddDocumentTypeRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snack: MatSnackBar,
    public validationPattern : ValidationPatternService) { }

  editFlag: boolean = false;


  ngOnInit(): void {
    this.controlForm();
  }


  controlForm() {
    let editData = this.data;
    this.docTypeRegistrationForm = this.fb.group({
      "createdBy": 1,
      // "modifiedBy": 0,
      createdDate: new Date(),
      // "modifiedDate": "2022-10-03T09:10:50.692Z",
      "isDeleted": false,
      // "id": 0,
      documentTypeName: [editData ? editData.documentTypeName : '', [Validators.required, Validators.pattern('')]]
    })

    if (editData) {
      this.editFlag = true;
    }
  }

  // ---------------------------------------- submit and update data -------------------------------------------
  postData() {
    let docType = this.docTypeRegistrationForm.value.documentTypeName;

    // if (!docType.replace(/\s/g, '').length) { //string length is 0
    //   // console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
    //   return;
    // }
    // else {
      console.log("String", docType.trim());
      //submit fuction call here /
      if (this.editFlag == false) {
        let obj = this.docTypeRegistrationForm.value;
        obj.documentTypeName = obj.documentTypeName.trim();
        this.service.setHttp('post', 'HRMS/DocumentType', false, obj, false, 'baseURL');
        this.service.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == '200') {
              // this.docTypeRegistrationForm.reset();
              this.dialogRef.close('yes');
              this.snack.open(res.statusMessage, 'ok', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 2000,
              });
            }
          }
        })
      } else if (this.editFlag == true) {
        let obj1 = this.docTypeRegistrationForm.value;
        console.log(obj1);

        let updateData = {
          "createdBy": 1,
          "modifiedBy": 1,
          // "createdDate": new Date(),
          "modifiedDate": new Date(),
          "isDeleted": false,
          id: this.data.id,
          documentTypeName: obj1.documentTypeName,
        }
        this.service.setHttp('put', 'HRMS/DocumentType', false, updateData, false, 'baseURL');
        this.service.getHttp().subscribe({
          next: (res: any) => {
            if (res.statusCode == '200') {
              this.dialogRef.close('yes');
              this.snack.open(res.statusMessage, 'ok', {
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 2000
              });
            }
          }
        })
      }
    }
  // }

  get formFiledControl() {
    return this.docTypeRegistrationForm.controls;
  }
}
