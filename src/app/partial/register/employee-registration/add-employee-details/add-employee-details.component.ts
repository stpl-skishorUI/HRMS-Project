import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-employee-details',
  templateUrl: './add-employee-details.component.html',
  styleUrls: ['./add-employee-details.component.scss']
})
export class AddEmployeeDetailsComponent implements OnInit {
  empRegistration: any;
  isLinear: boolean= false;
   genderArr=[{id:1,name:'Male'},{id:2,name:'Female'}];
   educations=[{id:1,name:'Undergradute'},{id:2,name:'Graduate'}, {id:3,name:'Post Graduate'}];
   fields: any;

  //  EducationArr=['Undergradute','Graduate','Post Graduate'];
  constructor(private _fb: FormBuilder) { }
  ngOnInit(): void {


    this.fields = {
        options: [
          {
            label: 'Option 1',
            value: '1'
          },
          {
            label: 'Option 2',
            value: '2'
          }
        ]
    };

    this.empRegistration = this._fb.group({
      "modifiedBy": ['0'],
      "modifiedDate": ["2022-10-07T09:27:47.095Z"],
      "empId": [0],
      "name": [""],
      "empCode": [],
      "dob": ["2022-10-07T09:27:47.095Z"],
      "mobileNo1": [""],
      "mobileNo2": [""],
      "emailId": [""],
      "gender": [null],
      "localAddress": [""],
      "permanentAddress": [""],
      "education": [""],
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
      this.patch();

      
    
    
      // secondFormGroup = this._formBuilder.group({
      //   secondCtrl: ['', Validators.required],
      // });
  }

  patch(){
    const control = <FormArray>this.empRegistration.get('empDocuments');
    this.fields.empDocuments.forEach((x: any) => {
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
