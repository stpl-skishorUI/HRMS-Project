import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import { Subscription } from 'rxjs';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-add-employee-details',
  templateUrl: './add-employee-details.component.html',
  styleUrls: ['./add-employee-details.component.scss']
})
export class AddEmployeeDetailsComponent implements OnInit {
  empRegistration: any;
  subscription!: Subscription;
  isLinear: boolean= false;
   genderArr=[{id:1,name:'Male'},{id:2,name:'Female'}];
   educations=[{id:1,name:'Undergradute'},{id:2,name:'Graduate'}, {id:3,name:'Post Graduate'}];
   fields: any;

  //  EducationArr=['Undergradute','Graduate','Post Graduate'];
  constructor(private _fb: FormBuilder,
              private apiService: CallApiService) { }
  ngOnInit(): void {
    this.empRegistration = this._fb.group({
      "modifiedBy": [0],
      "modifiedDate": ["2022-10-07T09:27:47.095Z"],
      "empId": [12272],
      "name": [""],
      "empCode": [1],
      "dob": [new Date()],
      "mobileNo1": [""],
      "mobileNo2": [""],
      "emailId": [""],
      "gender": [1],
      "localAddress": [""],
      "permanentAddress": [""],
      "education": [""],
      "course": [""],
      "additionalCertification": [""],
      "totalExperience": [0],
      "skillset": [""],
      "workDomain": [""],
      "profilePhoto": [""],
      "companyId": [1],
      "userTypeId": [0],
      "departmentId": [0],
      "designationId": [0],
      "joiningDate": [""],
      "joiningReference": [""],
      "bankId": [0],
      "branchId": [0],
      "accountNo": [0],
      "pF_No": [""],
      "uaN_No": [""],
      "esiC_No": [""],
      "paN_No": [""],
      "adhar_No": [""],
      "userName": [""],
      "password": [""],
      "createdBy": [0],
      "createdDate": ["2022-10-07T09:27:47.095Z"],
      "isDeleted": [true],
      "empDocuments": this._fb.array([  // create empty form array   
          this._fb.group({
            "modifiedBy": 0,
            "modifiedDate": "2022-10-14T06:54:59.740Z",
            "id": 0,
            "empCode": 0,
            "documentTypeId": 0,
            "documentNo": "",
            "uploadPath": "",
            "createdBy": 0,
            "createdDate": "2022-10-14T06:54:59.740Z",
            "isDeleted": true
          })
        ])
      });
      // this.patch();
  }

  get documentControls() : FormArray{
    return this.empRegistration.get('empDocuments') as FormArray;
  }




  // patch(){
  //   const control = <FormArray>this.empRegistration.get('type.options');
  //   this.fields.type.options.forEach((x:any) => {
  //     control.push(this.patchValues(x.label, x.value));
  //   })
  // }

  // patchValues(label: any, value: any){
  //   return this._fb.group({
  //     label: [label],
  //     value: [value]
  //   })
  // }


  submit(value: any) {
    console.log(" all submitted form values :",value);
    this.apiService.setHttp('post', 'HRMS/EmployeeRegister/AddEmployeeDetails', true, value ,false, 'baseURL');
    this.subscription =  this.apiService.getHttp().subscribe({
      next: (resp: any)=> {
        console.log("all data submitted successfully.", resp );
      },
      error:(error: any)=>{
        console.log("Error is:", error);
      }
    });
  }

  displayedColumns: string[] = ['srno', 'document_name', 'document_number', 'action'];
  dataSource = ELEMENT_DATA;

}

export interface PeriodicElement {
  srno: number;
  document_name: string;
  document_number: number;
  action: any;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, document_name: 'Addhar Card', document_number: 1234567891025698, action: ''},
  
];