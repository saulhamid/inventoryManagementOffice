import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Designation } from '../../_models/setup/Designation';


@Injectable({
  providedIn: 'root'
})
export class designationService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Designation/SelectAll`);
  }

  getEmpnameWithDesignation() {
     
    return this.http.get(`${environment.apiUrl}/api/Designation/SelectEmpNameWithDesign`);
  }
  geturl() {
     
    return `${environment.apiUrl}/api/Branch/SelectAll`;
  }
  Create(model: Designation) {
    return this.http.post(`${environment.apiUrl}/api/Designation/create`, model);
}
udate(model: Designation) {
  return this.http.post(`${environment.apiUrl}/api/Branch/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/Branch/FindId?id=`+Id);
}
delete(model: Designation) {
  return this.http.post(`${environment.apiUrl}/api/Branch/Delete`, model);
}
}