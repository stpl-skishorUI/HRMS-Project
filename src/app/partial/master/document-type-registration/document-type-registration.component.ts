import { Component, OnInit } from '@angular/core';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-document-type-registration',
  templateUrl: './document-type-registration.component.html',
  styleUrls: ['./document-type-registration.component.scss']
})
export class DocumentTypeRegistrationComponent implements OnInit {

  dataSource = new Array();
  constructor(private service : CallApiService) { }

  ngOnInit(): void {
    this.displayData()
  }

  displayData(){
    this.service.setHttp('get','DocumentType/GetAllDocumentType?documentType=Adhar%20Card%20New', false, false,false,
    'DocumentType');
    this.service.getHttp().subscribe({
     next:(res:any)=>{
       console.log(res);
       this.dataSource = res.responseData;
     }
    })
 }


}
