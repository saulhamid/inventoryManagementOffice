import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Category } from '../../_models/setup/category';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Category/SelectAll`);
    
  }
  Create(model: Category) {
    return this.http.post(`${environment.apiUrl}/api/Category/create`, model);
}
udate(model: Category) {
  return this.http.post(`${environment.apiUrl}/api/Category/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/Category/FindId?id=`+Id);
}
delete(model: Category) {
  return this.http.post(`${environment.apiUrl}/api/Category/Delete`, model);
}
}