import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UOM } from '../../_models/setup/uOM';


@Injectable({
  providedIn: 'root'
})
export class UOMService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/UOM/SelectAll`);
    
  }
  Create(model: UOM) {
    return this.http.post(`${environment.apiUrl}/api/UOM/create`, model);
}
udate(model: UOM) {
  return this.http.post(`${environment.apiUrl}/api/UOM/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/UOM/FindId?id=`+Id);
}
delete(model: UOM) {
  return this.http.post(`${environment.apiUrl}/api/UOM/Delete`, model);
}
}