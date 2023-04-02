import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Tramscondition } from '../../_models/setup/termscondition';


@Injectable({
  providedIn: 'root'
})
export class TramsconditionService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Tramscondition/SelectAll`);
  }
  Create(model: Tramscondition) {
    return this.http.post(`${environment.apiUrl}/api/Tramscondition/create`, model);
}
udate(model: Tramscondition) {
  return this.http.post(`${environment.apiUrl}/api/Tramscondition/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/Tramscondition/FindId?Id=`+Id);
}
delete(model: Tramscondition) {
  return this.http.post(`${environment.apiUrl}/api/Tramscondition/Delete`, model);
}
}