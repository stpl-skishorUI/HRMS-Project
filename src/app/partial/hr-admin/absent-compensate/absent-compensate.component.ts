import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAbsentCompensateComponent } from './add-absent-compensate/add-absent-compensate.component';

@Component({
  selector: 'app-absent-compensate',
  templateUrl: './absent-compensate.component.html',
  styleUrls: ['./absent-compensate.component.scss']
})
export class AbsentCompensateComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'Leave_Type', 'From_Date', 'To_Date'];
  dataSource = ELEMENT_DATA;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddAbsentCompensateComponent,{
      width:'40%'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: '', Leave_Type:'' , From_Date: 'H', To_Date:'',},
  
];

export interface PeriodicElement {
  position: number;
  name: any;
  Leave_Type: any;
  From_Date: any;
  To_Date: any;
}