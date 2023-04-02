import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Company } from '../../_models/setup/company';


@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Company/SelectAll`);
    
  }
  Create(model) {
     
    return this.http.post(`${environment.apiUrl}/api/Company/create`, model);
}
udate(model) {
   
  return this.http.post(`${environment.apiUrl}/api/Company/Update`, model);
}
findId(Id: string) {
   
  return this.http.get(`${environment.apiUrl}/api/Company/FindId?id=`+Id);
}
delete(model: Company) {
   
  return this.http.post(`${environment.apiUrl}/api/Company/Delete`, model);
}
}