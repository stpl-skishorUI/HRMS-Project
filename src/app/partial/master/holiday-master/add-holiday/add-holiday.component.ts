import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { CommonApiService } from 'src/app/core/services/common-api.service';
import { CommonMethodsService } from 'src/app/core/services/common-methods.service';

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
              private commonAPIService: CommonApiService,
              private fb: FormBuilder

    ) { }

  ngOnInit(): void {
    console.log("insInsert Form :", this.data.isInsert, this.data.selectedHoliday);
    this.defaultHolidayForm();
    this.getCompanyDrop();
    // this.data.selectedHoliday ? this.patchHoildayData(): '';
  }




  defaultHolidayForm(){
    // this.addHolidayForm = new FormGroup({
    //   createdBy: new FormControl(0),
    //   modifiedBy:new FormControl(0),
    //   createdDate: new FormControl(new Date()),
    //   modifiedDate: new FormControl(new Date()),
    //   isDeleted: new FormControl(true),
    //   id: new FormControl(0),
    //   holidayName: new FormControl(""),
    //   holidayType: new FormControl("null"),
    //   holidayDate: new FormControl(new Date()),
    //   comapanyId: new FormControl(),
    // });

    this.addHolidayForm = this.fb.group({
      createdBy: [(!this.data.isInsert) ? 1: 0],
        modifiedBy: [(!this.data.isInsert) ? 1: 0],
        createdDate: [new Date()],
        modifiedDate: [ (!this.data.isInsert) ? this.data.selectedHoliday.modifiedDate: new Date()],
        isDeleted: [true],
        id:[(!this.data.isInsert) ? this.data.selectedHoliday.id:0],
        holidayName: [(!this.data.isInsert) ? this.data.selectedHoliday.holidayName: ""],
        holidayType: [(!this.data.isInsert) ? this.data.selectedHoliday.holidayType: null],
        holidayDate: [(!this.data.isInsert) ? this.data.selectedHoliday.holidayDate: new Date()],
        comapanyId: [],
    })
  }

  // patchHoildayData(){
  //   this.addHolidayForm.patchValue({
  //       "createdBy": 1,
  //       "modifiedBy": 1,
  //       "createdDate": new Date(),
  //       "modifiedDate": this.data.selectedHoliday.modifiedDate,
  //       "isDeleted": true,
  //       "id": this.data.selectedHoliday.id,
  //       "holidayName": this.data.selectedHoliday.holidayName,
  //       "holidayType": this.data.selectedHoliday.holidayType,
  //       "holidayDate": this.data.selectedHoliday.holidayDate
  //   });
  // }


  saveHolidayData(){
    console.log(" All formData:", this.addHolidayForm.value );
    let formdata = this.addHolidayForm.value;
    let holiday = formdata.holidayName;
    // if (!holiday.replace(/\s/g, '').length) { //string length is 0
    //   console.log('string only contains whitespace (ie. spaces, tabs or line breaks)');
    //   return;
    // }
    // else{
    //   console.log("String" , holiday.trim());
    //   //submit fuction call here /
      
    // }

    if(this.data.isInsert){
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
    }else if(!this.data.isInsert){
      this.apiService.setHttp('put', 'api/HolidayMaster/UpdateHoliday', true, formdata ,false, 'baseURL');
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
    
  }

  // updateHoliday(){
  //   let formData = this.addHolidayForm.value;
  //   this.apiService.setHttp('put', 'api/HolidayMaster/UpdateHoliday', true, formData ,false, 'baseURL');
  //   this.subscription =  this.apiService.getHttp().subscribe({
  //     next: (resp: any)=> {
  //       console.log("Updated holiday :", resp );
  //       this.dialogRef.close();
  //     },
  //     error: (error: any)=> {
  //       console.log(" Error is :", error);
  //     }
  //   })
  // }

  getCompanyDrop(){
    // this.apiService.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId=1', true, false, false, 'baseURL');
    // this.subscription = this.apiService.getHttp().subscribe({
    //   next: (resp: any) => {
    //     console.log("getAll getCompanyDrop:", resp);
    //     if (resp.statusCode === "200" && resp.responseData !=null) {
    //       this.Companies = (resp.responseData);
    //     } else {
    //     if (resp.statusCode != "404") {
    //       console.log("error is :", resp.statusCode);
    //       }
    //     }
    //   },
    //   error: ((error: any) => { 
    //     console.log(" Error is :", error.status);
    //   })
    // });
    this.commonAPIService.getCompanies(0).subscribe({
      next: (resp: any) => {
        console.log("getCompanies data is :", resp)
        this.Companies = resp.responseData;
       },
       error: (error: any)=>{
        console.log(" Error is :", error);
       }
    })
    
  }

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

}
