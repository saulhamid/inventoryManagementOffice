import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Branch } from '../../_models/setup/Branch';


@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Branch/SelectAll`);
  }
  geturl() {
     
    return `${environment.apiUrl}/api/Branch/SelectAll`;
  }
  Create(model: Branch) {
    return this.http.post(`${environment.apiUrl}/api/Branch/create`, model);
}
udate(model: Branch) {
  return this.http.post(`${environment.apiUrl}/api/Branch/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/Branch/FindId?id=`+Id);
}
delete(model: Branch) {
  return this.http.post(`${environment.apiUrl}/api/Branch/Delete`, model);
}
}