import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { ValidationPatternService } from 'src/app/core/services/validation-pattern.service';

@Component({
  selector: 'app-add-bank-branch-registration',
  templateUrl: './add-bank-branch-registration.component.html',
  styleUrls: ['./add-bank-branch-registration.component.scss']
})
export class AddBankBranchRegistrationComponent implements OnInit {
  displayedColumns: string[] = ['sr_no', 'Bank_Name', 'action'];
  dataSource = new Array();
  bankForm!: FormGroup;
  editFlag:boolean = false;
  editObj :any;
  currentPage : number = 0;
  totalCount : number = 0;
  pageSize : number = 10;
  constructor(private fb: FormBuilder, private api: CallApiService, private mat: MatSnackBar,public validationPattern : ValidationPatternService) { }
  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  ngOnInit(): void {
    this.bindTable();
    this.defaultForm();
  }

  defaultForm() {
    this.bankForm = this.fb.group({
      "createdBy": 0,
      "modifiedBy": 0,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "isDeleted": false,
      "id":this.editFlag ? this.editObj.id :   0,
      "bankName":[ this.editFlag ? this.editObj.bankName : "",Validators.required]
    })
  }

  get fc(){return this.bankForm.controls}

  bindTable() {
    this.api.setHttp( 'get', 'api/BankRegistration/GetAllBankRegiByPagination?pageno='+(this.currentPage + 1)+'&pagesize=10', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 ? (this.dataSource = res.responseData,this.totalCount = res.responseData1.pageCount) : this.dataSource = [];
      }
    })
  }

  handlePageEvent(event: any) {
    this.currentPage = event.pageIndex;
    this.bindTable();
  }

  onDelete(id:number){
    this.api.setHttp('delete','api/BankRegistration?id='+id,false, false,false,'baseURL');
    this.api.getHttp().subscribe({
      next : (res:any)=>{
        this.mat.open(res.statusMessage,'ok',{duration:1000});
        this.bindTable();
      }
    })
  }

  onEdit(data:any){
    this.editObj = data;
    this.editFlag = true;
    this.defaultForm();
    this.fc['bankName'].setValidators([Validators.required]);
  }

  onCancel(){
    this.editFlag = false;
  }

  onSubmit() {
    let obj = this.bankForm.value;
    this.api.setHttp( this.editFlag ? 'put' : 'post', 'api/BankRegistration', false, obj, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 ? (this.mat.open(res.statusMessage, 'ok',{duration:1000}), this.bindTable(), this.editFlag = false,this.formGroupDirective.resetForm(), this.defaultForm()) :'';
      }
    })
  }
}
