import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { CallApiService } from 'src/app/core/services/call-api.service';
import { HandelErrorService } from 'src/app/core/services/handel-error.service';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';

@Component({
  selector: 'app-holiday-master',
  templateUrl: './holiday-master.component.html',
  styleUrls: ['./holiday-master.component.scss']
})
export class HolidayMasterComponent implements OnInit {
  Companies: any;
  Allholidays: any = null// for holiday 
  yearsDropdn: any // for years dropdown
  holiTypes: any // for holiday types
  subscription!: Subscription;
  // holidayType= null; // for holidaytype filter control
  // year= "2022"; // for holidaytype filter control
  searchForm!: FormGroup;
  totalCount=0;
  pageIndex = 0;
  pageSize = 10;



  constructor(public dialog: MatDialog,
              private apiService: CallApiService,
              private errorService: HandelErrorService) {}

  ngOnInit(): void {
    this.defaultSearchForm();
    this.getCompanyDrop();
    this.getYear();
    this.getHolidayType();
    this.getAllHoliday();
  }

  defaultSearchForm(){
    this.searchForm= new FormGroup({
      // pageno: new FormControl(1),
      holidaytype: new FormControl(' '),
      year: new FormControl(2022),
      companyId: new FormControl(0),
    });
  }


  
  onsearchData(){
    // this.searchForm.patchValue({
    //   pageno:1
    // });
    this.pageIndex = 0;
    this.getAllHoliday();
  }

  getCompanyDrop(){
    this.apiService.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId=0', true, false, false, 'baseURL');
    this.subscription = this.apiService.getHttp().subscribe({
      next: (resp: any) => {
        // console.log("getAll getCompanyDrop:", resp);
        if (resp.statusCode === "200" && resp.responseData !=null) {
          this.Companies = (resp.responseData);
        } 
        // else {
        // if (resp.statusCode != "404") {
        //   console.log("error is :", resp.statusCode);
        //   }
        // }
      },
      // error: ((error: any) => { 
      //   console.log(" Error is :", error.status);
      // })
    });
  }


  getAllHoliday(){
    let formData = this.searchForm.value;
    this.apiService.setHttp('get', 'api/HolidayMaster/GetAllHolidayByPagination?pageno='+(this.pageIndex+1)+'&pagesize='+this.pageSize+'&holidaytype='+formData.holidaytype+'&year='+formData.year+'&companyId='+formData.companyId, true, false, false, 'baseURL');
    // GetAllHolidayByPagination?pageno=1&pagesize=10&holidaytype=Compulsory&year=2022&comapanyId=1
    this.subscription = this.apiService.getHttp().subscribe({
      next: (resp: any) => {
        // console.log("getAll Holidays:", resp);
        if (resp.statusCode === "200" && resp.responseData !=null) {
          this.Allholidays = (resp.responseData);
          this.totalCount = resp.responseData1.pageCount;
        }else{
          this.errorService.handelError(resp.statusCode);
        }
        // else if (resp.statusCode != "404") {
        //   console.log("error is :", resp.statusCode);
        //   }
        if(resp.responseData == null){
          this.Allholidays = null;
        }

      },
      error: ((error: any) => { 
        // console.log(" Error is :", error.status);
        this.errorService.handelError(error.status);
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
    // console.log("event pagination",{ event });
    this.pageSize = event.pageSize;
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
        // console.log("getAll year:", resp );
        this.yearsDropdn = resp.responseData;
      },
      // error: (error: any)=>{
      //   console.log("error is :", error );
      // }
    })
  }

  getHolidayType(){
    this.apiService.setHttp('get', 'api/CommonDropDown/GetHolidatMaster',true, false, false, 'baseURL');
    this.subscription = this.apiService.getHttp().subscribe({
      next: (resp: any) =>{
        // console.log("getHolidayType:", resp );
        this.holiTypes =  resp.responseData;
      },
      // error: (error: any)=>{
      //   console.log("Error is: ", error );
      // }
    })
   
}







  addholiday() {
    const dialogRef = this.dialog.open(AddHolidayComponent,
      {
      data: {isInsert: true},
      disableClose: true
      
    });
    dialogRef.afterClosed().subscribe(result => {
      
      // console.log(`Dialog result: ${result}`);
      if(result == 'yes'){
        this.getAllHoliday();
      }
    });
  }

  updateHoliday(i: any){
  // console.log("selected For update:", this.Allholidays[i]);
    const dialogRef = this.dialog.open(AddHolidayComponent,{
      data: { isInsert: false, selectedHoliday: this.Allholidays[i] },
      disableClose: true

    });
    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if(result == 'yes'){
        this.getAllHoliday();
      }
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