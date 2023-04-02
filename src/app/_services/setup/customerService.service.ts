import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Customer } from '../../_models/setup/customer';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Customer/SelectAll`);
    
  }
  Create(model: Customer) {
     
    return this.http.post(`${environment.apiUrl}/api/Customer/create`, model);
}
udate(model: Customer) {
   
  return this.http.post(`${environment.apiUrl}/api/Customer/Update`, model);
}
findId(Id: string) {
   
  return this.http.get(`${environment.apiUrl}/api/Customer/FindId?id=`+Id);
}
delete(model: Customer) {
   
  return this.http.post(`${environment.apiUrl}/api/Customer/Delete`, model);
}
}