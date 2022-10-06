import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';

@Component({
  selector: 'app-holiday-master',
  templateUrl: './holiday-master.component.html',
  styleUrls: ['./holiday-master.component.scss']
})
export class HolidayMasterComponent implements OnInit {
  Allholidays: any = null// for holiday 
  yearsDropdn: any // for years dropdown
  holiTypes: any // for holiday types
  subscription!: Subscription;
  // holidayType= null; // for holidaytype filter control
  // year= "2022"; // for holidaytype filter control
  searchForm!: FormGroup;
  totalCount=0;
  pageIndex = 0;
  pageSize=10;



  constructor(public dialog: MatDialog,
              private apiService: CallApiService) {}

  ngOnInit(): void {
    this.defaultSearchForm();
    this.getYear();
    this.getHolidayType();
    this.getAllHoliday();

  }

  defaultSearchForm(){
    this.searchForm= new FormGroup({
      // pageno: new FormControl(1),
      pagesize: new FormControl(10),
      holidaytype: new FormControl(' '),
      year: new FormControl(2022)
    });
  }


  
  onsearchData(){
    // this.searchForm.patchValue({
    //   pageno:1
    // });
    this.pageIndex = 0;
    this.getAllHoliday();
  }


  getAllHoliday(){
    let formData = this.searchForm.value;
    this.apiService.setHttp('get', 'api/HolidayMaster/GetAllHolidayByPagination?pageno='+(this.pageIndex+1)+'&pagesize=10&holidaytype='+formData.holidaytype+'&year='+formData.year, true, false, false, 'baseURL');
    this.subscription = this.apiService.getHttp().subscribe({
      next: (resp: any) => {
        console.log("getAll Holidays:", resp);
        if (resp.statusCode === "200" && resp.responseData !=null) {
          this.Allholidays = new MatTableDataSource(resp.responseData);
          this.totalCount = resp.responseData1.pageCount;
        } else {
        if (resp.statusCode != "404") {
          console.log("error is :", resp.statusCode);
          }
        }
        if(resp.responseData == null){
          this.Allholidays = null;
        }

      },
      error: ((error: any) => { 
        console.log(" Error is :", error.status);
      })
    });
  }

  // onChangeType(){
  //   this.apiService.setHttp('get', 'api/HolidayMaster/GetAllHolidaysByTypeAndYear?type='+this.holidayType+'&year='+this.year, true, false, false, 'baseURL');
  //   this.subscription = this.apiService.getHttp().subscribe({
  //     next: (resp: any) => {
  //       console.log("getAll Holidays:", resp);
  //       if (resp.statusCode === "200" && resp.responseData != null) {
  //         this.Allholidays = resp.responseData;
  //       } else {
  //       if (resp.statusCode != "404") {
  //         console.log("error is :", resp.statusCode);
  //         }
  //       }

  //       if(resp.responseData == null){
  //         this.Allholidays = null;
  //       }
  //     },
  //     error: ((error: any) => { 
  //       console.log(" Error is :", error.status);
  //     })
  //   });
  // }

  pageChanged(event: PageEvent){
    console.log("event pagination",{ event });
    this.pageSize = event.pageSize
    // this.searchForm.patchValue({
    //   pageno: event.pageIndex,
    // });
    this.pageIndex = event.pageIndex;
    this.getAllHoliday();
  }

  getYear(){
    this.apiService.setHttp('get', 'api/CommonDropDown/GetYear', true, false, false, 'baseURL');
    this.subscription = this.apiService.getHttp().subscribe({
      next: (resp: any)=> {
        console.log("getAll year:", resp );
        this.yearsDropdn = resp.responseData;
      },
      error: (error: any)=>{
        console.log("error is :", error );
      }
    })
  }

  getHolidayType(){
    this.apiService.setHttp('get', 'api/CommonDropDown/GetHolidatMaster',true, false, false, 'baseURL');
    this.subscription = this.apiService.getHttp().subscribe({
      next: (resp: any) =>{
        console.log("getHolidayType:", resp );
        this.holiTypes =  resp.responseData;
      },
      error: (error: any)=>{
        console.log("Error is: ", error );
      }
    })
    // this.holiTypes = [
    //   {id:"1", type: 'Compulsory'},
    //   {id:"2", type: 'Optional'}
    // ]
}







  addholiday() {
    const dialogRef = this.dialog.open(AddHolidayComponent,{
      data: {isInsert: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllHoliday();
    });
  }

  updateHoliday(i: any){
  console.log("selected For update:", this.Allholidays[i]);
    const dialogRef = this.dialog.open(AddHolidayComponent,{
      data: { isInsert: false, selectedHoliday: this.Allholidays[i] }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.getAllHoliday();
    });
  }

  displayedColumns: string[] = ['srno', 'date', 'holiday_name', 'holiday','action'];
  dataSource = ELEMENT_DATA;
}
export interface PeriodicElement {
  srno: number;
  date: string;
  holiday_name: string;
  holiday: string;
  action: any;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {srno: 1, date: '31-12-2022', holiday_name: 'New Year', holiday: 'H',action:''}
];