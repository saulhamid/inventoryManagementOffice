import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PurchaseReturn } from '../../_models/purchase/purchaseReturn';

@Injectable({
    providedIn: 'root'
  })

export class Purchaseretunservice {
 constructor(  private router: Router,
    private http: HttpClient) { }
    Create(model: PurchaseReturn) {
      return this.http.post(`${environment.apiUrl}/api/PurchaseReturn/create`, model);
  }
    getAll() {
         
        return this.http.get(`${environment.apiUrl}/api/Purchaseorder/SelectAll`);
      }
      getAllreturnpurchase() {
         
        return this.http.get(`${environment.apiUrl}/api/PurchaseReturn/SelectAll`);
      }
      getAllpurchaseReturnFilter(Id: string,date:Date,supplier:string) {
        return this.http.get(`${environment.apiUrl}/api/PurchaseReturn/SelectAllfilter?id=${Id}&date=${date.toDateString()}&supplier=${supplier}`);
      }
      getAllpurchasereturn() {
         
        return this.http.get(`${environment.apiUrl}/api/Purchaseorder/SelectAll`);
      }
}
