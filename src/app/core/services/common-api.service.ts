import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CallApiService } from './call-api.service';

@Injectable({
  providedIn: 'root'
})
export class CommonApiService {
  resCompanies = new Array();
  resOrganization = new Array();

  constructor(private apiService: CallApiService) { }

  getOrganization() {
    return new Observable((obj) => {
      this.apiService.setHttp('get', 'api/CommonDropDown/GetOrganization', false, false, false, 'baseURL');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getCompanies(ordId:number) {
    return new Observable((obj) => {
      this.apiService.setHttp('get', 'api/CommonDropDown/GetCompany?OrgId='+ordId, false, false, false, 'baseURL');
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
        // next: (res: any) => { if (res.statusCode == "200") { obj.next(res); } else { obj.error(res); } },
        // error: (e: any) => { obj.error(e) }
      });
    });
  } 

  getDeptByCompanyId(companyId:number) {
    return new Observable((obj) => {
      this.apiService.setHttp('get', 'api/CommonDropDown/GetDepartment?CompanyId='+companyId, false, false, false, 'baseURL');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getDesigByDeptId(companyId:number,deptId:number) {
    return new Observable((obj) => {
      this.apiService.setHttp('get', 'api/CommonDropDown/GetDesignation?CompanyId='+companyId+'&DepartmentId='+deptId, false, false, false, 'baseURL');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getBanks() {
    return new Observable((obj) => {
      this.apiService.setHttp('get', 'api/CommonDropDown/GetBankRegistration', false, false, false, 'baseURL');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }

  getBranchesByBankId(bankId:number) {
    return new Observable((obj) => {
      this.apiService.setHttp('get', 'api/CommonDropDown/GetBankBranchRegistration?BankId=' + bankId, false, false, false, 'baseURL');
      this.apiService.getHttp().subscribe({
        next: (res: any) => { if (res.statusCode == "200") { obj.next(res); } else { obj.error(res); } },
        error: (e: any) => { obj.error(e) }
      });
    });
  }
  
}
