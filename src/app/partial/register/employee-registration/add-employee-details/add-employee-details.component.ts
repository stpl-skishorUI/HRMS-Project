import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-employee-details',
  templateUrl: './add-employee-details.component.html',
  styleUrls: ['./add-employee-details.component.scss']
})
export class AddEmployeeDetailsComponent implements OnInit {
  empRegistraion: any;
  isLinear: boolean= false;
   genderArr=[{id:1,name:'Male'},{id:2,name:'Female'}];
  //  EducationArr=['Undergradute','Graduate','Post Graduate'];
  constructor(private _fb: FormBuilder) { }
  ngOnInit(): void {
    this.empRegistraion = this._fb.group({
      "modifiedBy": ['0', Validators.required],
      "modifiedDate": ["2022-10-07T09:27:47.095Z"],
      "empId": [0],
      "name": [""],
      "empCode": [0],
      "dob": ["2022-10-07T09:27:47.095Z"],
      "mobileNo1": [""],
      "mobileNo2": [""],
      "emailId": [""],
      "gender": [0],
      "localAddress": [""],
      "permanentAddress": [""],
      "education": [0],
      "course": [""],
      "additionalCertification": [""],
      "totalExperience": [0],
      "skillset": [""],
      "workDomain": [""],
      "profilePhoto": [""],
      "companyId": [0],
      "userTypeId": [0],
      "departmentId": [0],
      "designationId": [0],
      "joiningDate": ["2022-10-07T09:27:47.095Z"],
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
      "empDocuments": this._fb.array([
    
      ])
      
      });
      this.patch()

      
    
    
      // secondFormGroup = this._formBuilder.group({
      //   secondCtrl: ['', Validators.required],
      // });
  }

  patch(){
    const control = <FormArray>this.empRegistraion.get('empDocuments');
    this.empRegistraion.empDocuments.forEach((x: any) => {
      control.push(this.patchValues(x.label, x.value))
    })
  }

  patchValues(label: any, value: any){
    return this._fb.group({
      label: [label],
      value: [value]
    })
  }


  submit(value: any) {
    console.log(" all submitted form values :",value);
  }


  

}
