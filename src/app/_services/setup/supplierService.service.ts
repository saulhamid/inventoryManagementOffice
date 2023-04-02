import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Supplier } from '../../_models/setup/Supplier';


@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Supplier/SelectAll`);
    
  }
  Create(model: Supplier) {
     
    return this.http.post(`${environment.apiUrl}/api/Supplier/create`, model);
}
udate(model: Supplier) {
   
  return this.http.post(`${environment.apiUrl}/api/Supplier/Update`, model);
}
findId(Id: string) {
   
  return this.http.get(`${environment.apiUrl}/api/Supplier/FindId?id=`+Id);
}
getProductSupplierId(SupplierId: string) {
   
  return this.http.get(`${environment.apiUrl}/api/Product/GetProductBySupplierId?SupplierId=`+SupplierId);
}
delete(model: Supplier) {
   
  return this.http.post(`${environment.apiUrl}/api/Supplier/Delete`, model);
}
}