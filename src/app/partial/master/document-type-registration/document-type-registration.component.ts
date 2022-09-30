import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-document-type-registration',
  templateUrl: './document-type-registration.component.html',
  styleUrls: ['./document-type-registration.component.scss']
})
export class DocumentTypeRegistrationComponent implements OnInit {

  documentTypeForm!: FormGroup;
  dataSource = new Array();
  constructor(private service: CallApiService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.controlForm();
    this.displayData();
  }

  controlForm() {
    this.documentTypeForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      // "modifiedDate": "2022-09-30T07:27:19.361Z",
      "isDeleted": true,
      "id": 0,
      "documentTypeName": ['']
    })
  }

  displayData() {
    this.service.setHttp('get', 'DocumentType/GetAllDocumentType?documentType=Adhar%20Card%20New', false, false, false,
      'DocumentType');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = res.responseData;
      }
    })
  }

  postData() {
    let obj = this.documentTypeForm.value;
    this.service.setHttp('post', 'DocumentType', false, obj, false, 'DocumentType');
    this.service.getHttp().subscribe({
      next: (res: any) =>
        this.displayData()
    })
  }

}
