import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CallApiService } from 'src/app/core/services/call-api.service';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss']
})
export class AddHolidayComponent implements OnInit {
  addHolidayForm!: FormGroup;
  Companies: any;
  subscription!: Subscription;
  // isInsert: boolean = true;
  options = [{id: "1", name: "Yes", type: "Optional"}, {id: "2", name: "No", type: "Compulsory"}]


  constructor(private apiService: CallApiService,
              public dialogRef: MatDialogRef<any>,
              @Inject(MAT_DIALOG_DATA) public data: any,

    ) { }

  ngOnInit(): void {
    this.defaultHolidayForm();
    this.getCompanyDrop();
    console.log("insInsert Form :", this.data.isInsert, this.data.selectedHoliday);
    this.data.selectedHoliday ? this.patchHoildayData(): '';
  }




  defaultHolidayForm(){
    this.addHolidayForm = new FormGroup({
      createdBy: new FormControl(0),
      modifiedBy:new FormControl(0),
      createdDate: new FormControl(new Date()),
      modifiedDate: new FormControl(new Date()),
      isDeleted: new FormControl(true),
      id: new FormControl(0),
      holidayName: new FormControl(""),
      holidayType: new FormControl("null"),
      holidayDate: new FormControl(new Date()),
      comapanyId: new FormControl(),
    });
  }

  saveHolidayData(){
    console.log(" All formData:", this.addHolidayForm.value );
    let formdata = this.addHolidayForm.value;
    this.apiService.setHttp('post', 'api/HolidayMaster/AddHoliday', true, formdata ,false, 'baseURL');
    this.subscription =  this.apiService.getHttp().subscribe({
      next: (resp: any)=> {
        console.log("Save  holiday :", resp );
        this.dialogRef.close();
      },
      error: (error: any)=> {
        console.log(" Error is :", error);
      }
    })
  }

  patchHoildayData(){
    this.addHolidayForm.patchValue({
        "createdBy": 1,
        "modifiedBy": 1,
        "createdDate": new Date(),
        "modifiedDate": this.data.selectedHoliday.modifiedDate,
        "isDeleted": true,
        "id": this.data.selectedHoliday.id,
        "holidayName": this.data.selectedHoliday.holidayName,
        "holidayType": this.data.selectedHoliday.holidayType,
        "holidayDate": this.data.selectedHoliday.holidayDate
    });
  }



  updateHoliday(){
    let formData = this.addHolidayForm.value;
    this.apiService.setHttp('put', 'api/HolidayMaster/UpdateHoliday', true, formData ,false, 'baseURL');
    this.subscription =  this.apiService.getHttp().subscribe({
      next: (resp: any)=> {
        console.log("Updated holiday :", resp );
        this.dialogRef.close();
      },
      error: (error: any)=> {
        console.log(" Error is :", error);
      }
    })
  }

  getCompanyDrop(){
    this.apiService.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId=1', true, false, false, 'baseURL');
    this.subscription = this.apiService.getHttp().subscribe({
      next: (resp: any) => {
        console.log("getAll getCompanyDrop:", resp);
        if (resp.statusCode === "200" && resp.responseData !=null) {
          this.Companies = (resp.responseData);
        } else {
        if (resp.statusCode != "404") {
          console.log("error is :", resp.statusCode);
          }
        }
      },
      error: ((error: any) => { 
        console.log(" Error is :", error.status);
      })
    });
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

}
