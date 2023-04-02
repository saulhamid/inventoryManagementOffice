import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { environment } from "../../../environments/environment";
import { Stocktransfer } from "../../_models/stock/stocktransfer";

@Injectable({
  providedIn: 'root'
})
export class StocktransferService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.apiUrl}/api/stocktransfer/SelectAll`);
  }
  getSelectAllApprovedAll() {
    return this.http.get(`${environment.apiUrl}/api/stocktransfer/SelectAllApproved`);
  }
  getSelectAllForReceive() {
    return this.http.get(`${environment.apiUrl}/api/stocktransfer/SelectAllForReceive`);
  }
  getSelectAllStockByBranch(BranchId) {
    return this.http.get(`${environment.apiUrl}/api/Product/SelectAllStockByBranch?BranchId=`+BranchId);
  }
  Create(model: Stocktransfer) {
    return this.http.post(`${environment.apiUrl}/api/stocktransfer/Create`, model);
}
udate(model: Stocktransfer) {
  return this.http.post(`${environment.apiUrl}/api/UOM/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/UOM/FindId?id=`+Id);
}
approved(model: Stocktransfer) {
  return this.http.post(`${environment.apiUrl}/api/stocktransfer/StockTransferApproved`, model);
}
rejected(model: Stocktransfer) {
  return this.http.post(`${environment.apiUrl}/api/stocktransfer/StockTransferRejected`, model);
}
received(model: Stocktransfer) {
  return this.http.post(`${environment.apiUrl}/api/stocktransfer/StockTransferReceived`, model);
}
}