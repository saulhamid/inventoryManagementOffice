import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Section } from '../../_models/setup/section';


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Section/SelectAll`);
    
  }
  Create(model: Section) {
     
    return this.http.post(`${environment.apiUrl}/api/Section/create`, model);
}
udate(model: Section) {
   
  return this.http.post(`${environment.apiUrl}/api/Section/Update`, model);
}
findId(Id: string) {
   
  return this.http.get(`${environment.apiUrl}/api/Section/FindId?id=`+Id);
}
delete(model: Section) {
   
  return this.http.post(`${environment.apiUrl}/api/Section/Delete`, model);
}
}