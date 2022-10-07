import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CallApiService } from 'src/app/core/services/call-api.service';

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
  constructor(private fb: FormBuilder, private api: CallApiService, private mat: MatSnackBar) { }

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
      "bankName": this.editFlag ? this.editObj.bankName : ""
    })
  }
  bindTable() {
    this.api.setHttp( 'get', 'api/BankRegistration/GetAll', false, false, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        res.statusCode == 200 ? this.dataSource = res.responseData : this.dataSource = [];
      }
    })
  }
  onDelete(id:number){
    this.api.setHttp('delete','api/BankRegistration?id='+id,false, false,false,'baseURL');
    this.api.getHttp().subscribe({
      next : (res:any)=>{
        this.mat.open(res.statusMessage,'ok');
        this.bindTable();
      }
    })
  }

  onEdit(data:any){
    this.editObj = data;
    this.editFlag = true;
    this.defaultForm();
  }

  onCancel(){
    this.editFlag = false;
  }

  onSubmit() {
    let obj = this.bankForm.value;
    this.api.setHttp( this.editFlag ? 'put' : 'post', 'api/BankRegistration', false, obj, false, 'baseURL');
    this.api.getHttp().subscribe({
      next: (res: any) => {
        console.log(res);
        this.mat.open(res.statusMessage, 'ok');
        this.bankForm.reset();
        this.bindTable();
        this.editFlag = false;
      }
    })
    this.defaultForm();
  }
}
// const ELEMENT_DATA: PeriodicElement[] = [
//   { sr_no: 1, Bank_Name: '', action: '' },
// ];
// export interface PeriodicElement {
//   sr_no: number;
//   Bank_Name: any;
//   action: any;
// }
