import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';

@Component({
  selector: 'app-holiday-master',
  templateUrl: './holiday-master.component.html',
  styleUrls: ['./holiday-master.component.scss']
})
export class HolidayMasterComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  addholiday() {
    const dialogRef = this.dialog.open(AddHolidayComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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