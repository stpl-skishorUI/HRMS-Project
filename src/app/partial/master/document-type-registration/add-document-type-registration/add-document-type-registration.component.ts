import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-document-type-registration',
  templateUrl: './add-document-type-registration.component.html',
  styleUrls: ['./add-document-type-registration.component.scss']
})
export class AddDocumentTypeRegistrationComponent implements OnInit {
  docTypeRegistrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private service: CallApiService, public dialog: MatDialog, public dialogRef: MatDialogRef<AddDocumentTypeRegistrationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private snack: MatSnackBar) { }

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
      documentTypeName: [editData ? editData.documentTypeName : '']
    })

    if (editData) {
      this.editFlag = true;
    }
  }

  // ---------------------------------------- submit and update data -------------------------------------------
  postData() {
    if (this.editFlag == false) {
      let obj = this.docTypeRegistrationForm.value;
      this.service.setHttp('post', 'HRMS/DocumentType', false, obj, false, 'baseURL');
      this.service.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == '200') {
            // this.docTypeRegistrationForm.reset();
            this.dialogRef.close('yes');
            this.snack.open(res.statusMessage, 'ok', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
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
            });
          }
        }
      })
    }
  }
}
