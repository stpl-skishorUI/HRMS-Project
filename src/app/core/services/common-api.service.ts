import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CallApiService } from './call-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {

  constructor(private apiService: CallApiService) { }

  getCompanies(){
    return new Observable(obj => {
      this.apiService.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId=1', true, false, false, 'baseURL');
      this.apiService.getHttp().subscribe({
        next: (res: any) => {
          if (res.statusCode == "200") {
            obj.next(res);
          }
          else{
            obj.error(res);
          }
        },
        error: (error: any) => {
          console.log("Error is :",error );
        }
      });
    });
  }

}
