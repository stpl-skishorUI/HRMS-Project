import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddDocumentTypeRegistrationComponent } from './add-document-type-registration/add-document-type-registration.component';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';

@Component({
  selector: 'app-document-type-registration',
  templateUrl: './document-type-registration.component.html',
  styleUrls: ['./document-type-registration.component.scss']
})
export class DocumentTypeRegistrationComponent implements OnInit {

  displayedColumns: string[] = ['sr_no', 'documentTypeName', 'action'];
  dataSource = ELEMENT_DATA;

  constructor(public dialog: MatDialog, private service: CallApiService, private fb: FormBuilder, 
    private snack: MatSnackBar, private handalErrorService: HandelErrorService) { }

  filterForm!: FormGroup; 
  pageSize = 10;
  totalCount!: number;
  currentPage: number = 0;
  docType:string = '';

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
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.displayData();
    });
  }

  // ---------------------------------------- Display Data --------------------------------------------
  displayData() {
    this.service.setHttp('get', 'HRMS/DocumentType/GetAllDocumentTypeByPagination?pageno='+ (this.currentPage + 1) +'&pagesize=5&documentType1=' + this.docType, false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200' && res.responseData.length) {
          this.dataSource = res.responseData;
          this.filterForm.reset();
          this.totalCount = res.responseData1.pageCount;
        }
        else{
          this.dataSource = [];
        }
      },error: (error: any) => {
        this.handalErrorService.handelError(error.status);
      }
    })
  }

  // ------------------------------------------ Pagination --------------------------------------------
  onClickPaginatior(data: any) {
    // this.pageSize = data.pageSize;
    this.currentPage = data.pageIndex;

    this.displayData();
  }

  // -------------------------------------------- Delete Record ----------------------------------------
  deleteRecord(deleteId: any) {
    let deleteIndex = deleteId.id;

    this.service.setHttp('delete', 'HRMS/DocumentType?Id= ' + deleteIndex + ' ', false, false, false,
      'baseURL');
    this.service.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode == '200') {
          this.snack.open('record deleted successfully!', 'ok', {
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2000
          });
          this.displayData();
        }
      },
      error: (error: any) => {
        this.handalErrorService.handelError(error.status);
      }
    })
  }

  // ----------------------------------------- Filter Record -------------------------------------------
  filterData() {
    this.docType = this.filterForm.value.documentTypeName;
    this.displayData();
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