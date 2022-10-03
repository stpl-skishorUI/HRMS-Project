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
      "createdBy": 1,
      "modifiedBy": 1,
      "createdDate": new Date(),
      // "modifiedDate": "2022-09-30T07:27:19.361Z",
      // "isDeleted": false,
      // "id": 0,
      "documentTypeName": ['']
    })
  }

  displayData() {
    this.service.setHttp('get', 'api/DocumentType/GetAllDocumentType', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        console.log(res);
        this.dataSource = res.responseData;
      }
    })
  }

  postData() {
    let obj = this.documentTypeForm.value;
    this.service.setHttp('post', 'api/DocumentType', false, obj, false, 'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) =>{
        this.displayData();
         this.documentTypeForm.reset();
      }
      
    })
  }

}
