import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subcategory } from '../../_models/setup/subcategory';


@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Subcategory/SelectAll`);
    
  }
  Create(model: Subcategory) {
     
    return this.http.post(`${environment.apiUrl}/api/Subcategory/create`, model);
}
udate(model: Subcategory) {
   
  return this.http.post(`${environment.apiUrl}/api/Subcategory/Update`, model);
}
findId(Id: string) {
   
  return this.http.get(`${environment.apiUrl}/api/Subcategory/FindId?id=`+Id);
}
delete(model: Subcategory) {
   
  return this.http.post(`${environment.apiUrl}/api/Subcategory/Delete`, model);
}
}