import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Department } from '../../_models/setup/department';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Department/SelectAll`);
    
  }
  Create(model: Department) {
     
    return this.http.post(`${environment.apiUrl}/api/Department/create`, model);
}
udate(model: Department) {
   
  return this.http.post(`${environment.apiUrl}/api/Department/Update`, model);
}
findId(Id: string) {
   
  return this.http.get(`${environment.apiUrl}/api/Department/FindId?id=`+Id);
}
delete(model: Department) {
   
  return this.http.post(`${environment.apiUrl}/api/Department/Delete`, model);
}
}