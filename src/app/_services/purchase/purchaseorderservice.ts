
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { indentProceesPOVM } from '../../_models/indent/indentProceesPOVM';
import { Purchaseorder } from '../../_models/purchase/purchaseorder';
import { id } from '@swimlane/ngx-charts';
import { Observable } from 'rxjs';
import { Datepickerfrom } from '../../_models/requisition/datepickerfrom';

@Injectable({
  providedIn: 'root'
})
export class Purchaseorderservice {
  getAllIndentFilter(branchId: string, departmentId: string, sectionId: string, employeeId: string, date: Date) {
    return this.http.get(`${environment.apiUrl}/api/Purchaseorder/SelectAll`);
  }

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.apiUrl}/api/Purchaseorder/SelectAll`);
  }
  getAllNotApproved() {
    return this.http.get(`${environment.apiUrl}/api/Purchaseorder/SelectAllNotApproved`);
  }
  getAllApproved() {
    return this.http.get(`${environment.apiUrl}/api/Purchaseorder/SelectAllApproved`);
  }
  getAllpurchase() {
    return this.http.get(`${environment.apiUrl}/api/Purchase/SelectAll`);
  }
  getAllpurchaseReturn() {
    return this.http.get(`${environment.apiUrl}/api/Purchase/SelectAllReturn`);
  }

  getAllAvgPurchase() {
    return this.http.get(`${environment.apiUrl}/api/PurchaseOrder/SelectAvgPurchase`);
  }

  postAllAvgPurchaseWithDate(model:Datepickerfrom) {
    return this.http.post(`${environment.apiUrl}/api/PurchaseOrder/SelectAvgPurchaseDateFilter`,model);
  }

  getAllpurchaseOrderById(Id: string) {
    return this.http.get(`${environment.apiUrl}/api/Purchaseorder/SelectAllfilter?id=${Id}`);
  }
  getAllpurchaseOrderFilter(status: string, supplier: string,sdate:string,edate:string,rptType:string) {
    return this.http.get(`${environment.apiUrl}/api/Purchaseorder/SelectAllfilter?status=${status}&supplier=${supplier}&sdate=${sdate}&edate=${edate}&rptType=${rptType}`);
  }
  getAllpurchaseFilter(Id: string,date:Date,supplier:string) {
    return this.http.get(`${environment.apiUrl}/api/Purchase/SelectAllfilter?id=${Id}&date=${date.toDateString()}&supplier=${supplier}`);
  }
  downloadPurchaseInvoice (Id: string): Observable<Blob>  {
    let headers = new Headers();
    headers.append("Accept", "application/pdf");
    return this.http.get(`${environment.apiUrl}/api/Purchase/rptpurchaseinvoice?id=${Id}`, {
      responseType: 'blob' 
    });
  }

  Create(model: Purchaseorder) {
    return this.http.post(`${environment.apiUrl}/api/Purchaseorder/create`, model);
}
udate(model: Purchaseorder) {
  return this.http.post(`${environment.apiUrl}/api/Purchaseorder/Update`, model);
}
approvedqc(model: Purchaseorder) {
  return this.http.post(`${environment.apiUrl}/api/Purchaseorder/ApprovedQC`, model);
}
approved(model: Purchaseorder) {
  return this.http.post(`${environment.apiUrl}/api/Purchaseorder/Approved`, model);
}

purchaseOrderPrint(model: Purchaseorder): Observable<Blob> {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.post(`${environment.apiUrl}/api/Purchaseorder/PurchaseOrderPrint`, model,{
    responseType: 'blob' 
  });
}

findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/Purchaseorder/FindId?id=`+Id);
}
delete(model: Purchaseorder) {
  return this.http.post(`${environment.apiUrl}/api/Purchaseorder/Delete`, model);
}
downloadPurOrderInvoice (Id: string): Observable<Blob>  {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/Purchaseorder/rptpurchaseorderinvoice?id=${Id}`, {
    responseType: 'blob' 
  });
}
downloadPdf (status: string,supliId: string,sdate:string,edate:string,rptType:string): Observable<Blob>  {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/Purchaseorder/rptpurchaseorderlist?status=${status}&supplier=${supliId}&sdate=${sdate}&edate=${edate}&rptType=${rptType}`, {
    responseType: 'blob' 
  });
}
downloadPdfList (status: string,supliId: string,sdate:string,edate:string,rptType:string): Observable<Blob>  {
   ;
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/Purchase/rptpurchaselist?status=${status}&supplier=${supliId}&sdate=${sdate}&edate=${edate}&rptType=${rptType}`, {
    responseType: 'blob' 
  });
}
}