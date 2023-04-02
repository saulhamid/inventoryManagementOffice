import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Employee } from '../../_models/setup/employee';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Employee/SelectAll`);
    
  }
  Create(model: Employee) {
     
    return this.http.post(`${environment.apiUrl}/api/Employee/create`, model);
}
udate(model: Employee) {
   
  return this.http.post(`${environment.apiUrl}/api/Employee/Update`, model);
}
findId(Id: string) {
   
  return this.http.get(`${environment.apiUrl}/api/Employee/FindId?id=`+Id);
}
delete(model: Employee) {
   
  return this.http.post(`${environment.apiUrl}/api/Employee/Delete`, model);
}
}