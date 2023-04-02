import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Indentmaster } from '../../_models/indent/indentmaster';
import { indentProceesPOVM } from '../../_models/indent/indentProceesPOVM';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Indentservice {
  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/Indent/SelectAll`);
  }
  getAllapprved() {
     
    return this.http.get(`${environment.apiUrl}/api/Indent/SelectAllApproved`);
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
rejected(model: Indentmaster) {
  return this.http.post(`${environment.apiUrl}/api/Indent/RejectIndent`, model);
}
approvedprocurment(model: Indentmaster) {
  return this.http.post(`${environment.apiUrl}/api/Indent/ProcurmentApproved`, model);
}
requisitionToinden(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/Indent/RequestionToIndent?RequitionId=`+Id);
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
getAllIndentFilter(status: string,depart:string,section:string,employee:string,date:string,rptType:string) {
  return this.http.get(`${environment.apiUrl}/api/Indent/SelectAllFilter?status=${status}&depart=${depart}&section=${section}&employee=${employee}&date=${date}&rptType=${rptType}`);
}
downloadPdf (status: string,depart:string,section:string,employee:string,date:string,rptType:string): Observable<Blob>  {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/Indent/rptIndentlist?status=${status}&depart=${depart}&section=${section}&employee=${employee}&date=${date}&rptType=${rptType}`, {
    responseType: 'blob' 
  });
}
}