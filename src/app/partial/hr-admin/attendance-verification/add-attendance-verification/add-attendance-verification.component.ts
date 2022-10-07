import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-attendance-verification',
  templateUrl: './add-attendance-verification.component.html',
  styleUrls: ['./add-attendance-verification.component.scss']
})
export class AddAttendanceVerificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['date', 'in_time', 'out_time', 'total_hrs', 'latebyhrs','earlybyhrs','extrahrs','status','updatestatus'];
  dataSource = ELEMENT_DATA;

}
export interface PeriodicElement {
  date: string;
  in_time: number;
  out_time: number;
  total_hrs: number;
  latebyhrs: number;
  earlybyhrs: number;
  extrahrs: number;
  status: string;
  updatestatus: any;


}
const ELEMENT_DATA: PeriodicElement[] = [
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},
  {date: '6-10-2022', in_time: 9.30, out_time: 7, total_hrs: 8, latebyhrs: 3,earlybyhrs: 4,extrahrs:9,status:'Sunday Working',updatestatus:''},

];
