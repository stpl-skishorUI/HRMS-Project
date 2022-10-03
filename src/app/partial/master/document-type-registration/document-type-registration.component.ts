import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddDocumentTypeRegistrationComponent } from './add-document-type-registration/add-document-type-registration.component';

@Component({
  selector: 'app-document-type-registration',
  templateUrl: './document-type-registration.component.html',
  styleUrls: ['./document-type-registration.component.scss']
})
export class DocumentTypeRegistrationComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'documentTypeName', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private service: CallApiService, private fb: FormBuilder) { }

  filterForm!: FormGroup;
  pageSize!: number;
  totalCount!: number;
  currentPage: number = 1;

  ngOnInit(): void {
    this.displayData();
    this.filterMethod();
    // this.pagination();
  }

  filterMethod() {
    this.filterForm = this.fb.group({
      documentTypeName: [''],
    })
  }

  // ---------------------------------------- Dialog --------------------------------------------------
  openDialog(data?: any) {
    const dialogRef = this.dialog.open(AddDocumentTypeRegistrationComponent, {
      width: '40%',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.displayData();
    });
  }

  // ---------------------------------------- Display Data --------------------------------------------
  displayData() {
    this.service.setHttp('get', 'api/DocumentType/GetAllDocumentType', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          // console.log(res);
          this.dataSource = res.responseData;
        }
      }
    })
  }

  // ------------------------------------------ Pagination --------------------------------------------
  // onClickPaginatior(data: any) {
  //   this.pageSize = data.pageSize;
  //   this.currentPage = data.pageIndex;

  //   this.displayData();
  //   this.pagination();
  // }

  // pagination() {
  //   this.service.setHttp('get', 'api/DocumentType/GetAllDocumentTypeByPagination?pageno=' + this.currentPage + '&pagesize=10', false, false, false,
  //     'baseURL');
  //   this.service.getHttp().subscribe({
  //     next: (res: any) => {
  //       if (res.statusCode == '200') {
  //         console.log(res);
  //         this.dataSource = res.responseData;
  //         this.totalCount = res.responseData.totalCount;
  //       }
  //     }
  //   })
  // }

  // -------------------------------------------- Delete Record ----------------------------------------
  deleteRecord(deleteId: any) {
    let deleteIndex = deleteId.id;

    this.service.setHttp('delete', 'api/DocumentType?Id= ' + deleteIndex + ' ', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.displayData();
        }
      }
    })
  }

  // ----------------------------------------- Filter Record -------------------------------------------
  filterData() {
    let docType = this.filterForm.value.documentTypeName;
    console.log(docType);
    

    this.service.setHttp('get', 'api/DocumentType/GetAllDocumentType?documentType=' + docType, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          console.log('aaa', res);
          // let filterArray: any[] = [res.responseData];
          this.dataSource = res.responseData;
          this.filterForm.reset();
        }
      }
    })
  }
}
const ELEMENT_DATA: PeriodicElement[] = [
  { sr_no: 1, Document_Type_Name: '', action: '', },
];
export interface PeriodicElement {
  sr_no: number;
  Document_Type_Name: any;
  action: any;

}