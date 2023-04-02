import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Requisitionmaster } from '../../_models/requisition/requisitionmaster';
import { Observable } from 'rxjs';
import { RequisitionDetail } from '../../_models/requisition/RequisitionDetail';
import { RequirementExtraQty } from '../../_models/requisition/RequirementExtraQty';
import { Stockissue } from '../../_models/stock/stockissue';
import { Datepickerfrom } from '../../_models/requisition/datepickerfrom';
import { RequisitionAlert } from '../../_models/requisition/RequisitionAlert';
import { RequisitionNVM } from '../../_models/requisition/RequisitionNVM';

@Injectable({
  providedIn: 'root'
})
export class Requisitionservice {
  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/requisition/SelectAll`);
  }

  getAllRequisitionReportData(){
    return this.http.get(`${environment.apiUrl}/api/requisition/RequisitionPrev`);
  }
  

  postRequistionNvmPDF(model:RequisitionNVM[]): Observable<Blob>{
    debugger;
    let headers = new Headers();
    headers.append("Accept", "application/pdf");
    debugger;
    return this.http.post(`${environment.apiUrl}/api/requisition/RequisitionPrevReport`, model,{
      responseType: 'blob' 
    });
  }

  getAllapprved() {
     
    return this.http.get(`${environment.apiUrl}/api/requisition/SelectAllApproved`);
  }

  
  getAllapprvedRecommended() {
     
    return this.http.get(`${environment.apiUrl}/api/requisition/SelectAllApprovedWithSecondApporove`);
  }

  getAllForThirdApporove() {
     
    return this.http.get(`${environment.apiUrl}/api/requisition/SelectAllForThirdApporove`);
  }

  getAllApprovedTransfer() {
    return this.http.get(`${environment.apiUrl}/api/requisition/SelectAllApprovedTransfer`);
  }
  Create(model: Requisitionmaster) {
    debugger;
    return this.http.post(`${environment.apiUrl}/api/requisition/create`, model);
}


CreateNewPdf(model: Requisitionmaster): Observable<Blob> {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/create`, model,{
    responseType: 'blob' 
  });
}

RequisitionApproveCreatePdf(model: Requisitionmaster):Observable<Blob> {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/Approved`, model,{
    responseType: 'blob' 
  });
}


RequisitionApprovePartTwoCreatePdf(model: Requisitionmaster):Observable<Blob> {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/ApprovedPartTwo`, model,{
    responseType: 'blob' 
  });
}


RequisitionApprovePartThreeCreatePdf(model: Requisitionmaster):Observable<Blob> {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/ApprovedPartThree`, model,{
    responseType: 'blob' 
  });
}


udate(model: Requisitionmaster) {
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/Update`, model);
}

udateDetails(model: Requisitionmaster) {
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/UpdateDetail`, model);
}
approved(model: Requisitionmaster) {
  return this.http.post(`${environment.apiUrl}/api/requisition/Approved`, model);
}

approveRequisitionAlert(model: RequisitionAlert) {
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/ApproveRequisitionAlert`, model);
}

approveRequisitionAlertFromBranch(model: RequisitionAlert) {
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/ApproveRequisitionAlertFromBranch`, model);
}

rejected(model: Requisitionmaster) {
  return this.http.post(`${environment.apiUrl}/api/requisition/RejectRequisition`, model);
}
approvedprocurment(model: Requisitionmaster) {
  return this.http.post(`${environment.apiUrl}/api/requisition/ProcurmentApproved`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/requisition/FindId?id=`+Id);
}
delete(model: Requisitionmaster) {
  return this.http.post(`${environment.apiUrl}/api/requisition/Delete`, model);
}
getprocessPO() {
  return this.http.get(`${environment.apiUrl}/api/requisition/GeProductPO`);
}
deleteDetail(model: RequisitionDetail) {
  return this.http.post(`${environment.apiUrl}/api/requisition/Delete`, model);
}
getRequestionDetail() {
  return this.http.get(`${environment.apiUrl}/api/requisition/RequestionDetailAll`);
}

getRequestionAnalysisBranchWise(branchId:string) {
  return this.http.get(`${environment.apiUrl}/api/requisition/RequestionDetailBranchWise?branchId=${branchId}`);
}
getRequestionDetailStock() {
  return this.http.get(`${environment.apiUrl}/api/requisition/GetRequestionDetailStockStock`);
}

getAllRequisitionDetailsStockAndPurchase(){
  return this.http.get(`${environment.apiUrl}/api/requisition/StockIssueDetailsData`);
}


getAllRequisitionStockAndPurchasePSD(){
  return this.http.get(`${environment.apiUrl}/api/requisition/RequisitionStockIssueData`);
}


postExtraQty(model:RequirementExtraQty){
  //return model;
  return this.http.post(`${environment.apiUrl}/api/requisition/requirementextraqty`, model);
}

postFromToDate(model:Datepickerfrom){
  //return model;
  return this.http.post(`${environment.apiUrl}/api/requisition/requestionFilter`, model);
}

postExtraQtyGlobal(model:RequirementExtraQty[]){
  //return model;
  return this.http.post(`${environment.apiUrl}/api/requisition/requirementextraqtyglobal`, model);
}

postExtraQtyWithAllData(model:Stockissue[]):Observable<Blob>{
  //return model;
  //return this.http.post(`${environment.apiUrl}/api/requisition/requirementSaveAll`, model);

  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  debugger;
  return this.http.post(`${environment.apiUrl}/api/requisition/requirementSaveAll`, model,{
    responseType: 'blob' 
  });
}

postExtraQtyWithAllDatabackup(model:Stockissue[]){
  //return model;
  return this.http.post(`${environment.apiUrl}/api/requisition/requirementSaveAll`, model);
}


getAllRequisitionAlert() {
  return this.http.get(`${environment.apiUrl}/api/requisition/SelectAllRequisitionAlert`);
}

getAllrequisitionFilter(status: string,depart:string,section:string,employee:string,date:string,rptType:string) {
  return this.http.get(`${environment.apiUrl}/api/requisition/SelectAllFilter?status=${status}&depart=${depart}&section=${section}&employee=${employee}&date=${date}&rptType=${rptType}`);
}
downloadPdf (status: string,depart:string,section:string,employee:string,date:string,rptType:string): Observable<Blob>  {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/requisition/rptrequisitionlist?status=${status}&depart=${depart}&section=${section}&employee=${employee}&date=${date}&rptType=${rptType}`, {
    responseType: 'blob' 
  });
}
}