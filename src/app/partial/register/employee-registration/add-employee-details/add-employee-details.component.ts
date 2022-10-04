import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-employee-details',
  templateUrl: './add-employee-details.component.html',
  styleUrls: ['./add-employee-details.component.scss']
})
export class AddEmployeeDetailsComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

}
