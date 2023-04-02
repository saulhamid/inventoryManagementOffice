import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Indentmaster } from '../../_models/indent/indentmaster';
import { indentProceesPOVM } from '../../_models/indent/indentProceesPOVM';

@Injectable({
  providedIn: 'root'
})
export class Indentservice {
  constructor(  private router: Router,
    private http: HttpClient) { }
  getAll() {
    return this.http.get(`${environment.apiUrl}/api/Indent/SelectAll`);
  }
  Create(model: Indentmaster) {
    return this.http.post(`${environment.apiUrl}/api/Indent/create`, model);
}
CreatePurchaseorder(model: indentProceesPOVM[]) {
  return this.http.post(`${environment.apiUrl}/api/PurchaseOrder/createtopurchase`, model);
}
udate(model: Indentmaster) {
  return this.http.post(`${environment.apiUrl}/api/Indent/Update`, model);
}
approved(model: Indentmaster) {
  return this.http.post(`${environment.apiUrl}/api/Indent/Approved`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/Indent/FindId?id=`+Id);
}
delete(model: Indentmaster) {
  return this.http.post(`${environment.apiUrl}/api/Indent/Delete`, model);
}
getprocessPO() {
  return this.http.get(`${environment.apiUrl}/api/Indent/GeProductPO`);
}
}