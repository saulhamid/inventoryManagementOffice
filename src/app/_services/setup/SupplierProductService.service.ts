import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SupplierProduct } from '../../_models/setup/SupplierProduct';
@Injectable({
  providedIn: 'root'
})
export class SupplierProductService {
  constructor(  private router: Router,
    private http: HttpClient) { }
  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/SupplierProduct/SelectAll`);
  }
  Create(model: SupplierProduct[]) {
    return this.http.post(`${environment.apiUrl}/api/SupplierProduct/create`, model);
}
udate(model: SupplierProduct) {
  return this.http.post(`${environment.apiUrl}/api/SupplierProduct/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/SupplierProduct/FindId?id=`+Id);
}
delete(model: SupplierProduct) {
  return this.http.post(`${environment.apiUrl}/api/SupplierProduct/Delete`, model);
}
getsupplydetailbyId(productid:string) {
   
  return this.http.get(`${environment.apiUrl}/api/SupplierProduct/GetSupplyByProductId?ProductId=`+productid);
}
getProductbysupId(productid:string) {
   
  return this.http.get(`${environment.apiUrl}/api/Product/FindProductBySupid?ProductId=`+productid);
}
}