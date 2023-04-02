import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { RequisitionNVM } from "../../_models/requisition/RequisitionNVM";
import { Stockissue } from "../../_models/stock/stockissue";




@Injectable({
  providedIn: 'root'
})
export class StockissueService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/StockIssue/SelectAll`);
    
  }
  Create(model: Stockissue) {
  debugger
    return this.http.post(`${environment.apiUrl}/api/StockIssue/Create`, model);
}
udate(model: Stockissue) {
  return this.http.post(`${environment.apiUrl}/api/UOM/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/UOM/FindId?id=`+Id);
}
delete(model: Stockissue) {
  return this.http.post(`${environment.apiUrl}/api/UOM/Delete`, model);
}
StockIssueNew(model: RequisitionNVM[]):Observable<Blob>{
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
    return this.http.post(`${environment.apiUrl}/api/StockIssue/stockIssueNew`, model,{
      responseType: 'blob' 
    });
}
}