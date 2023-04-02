import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Product } from '../../_models/setup/Product';
import { throwError, Observable } from 'rxjs';
import { Stockissue } from '../../_models/stock/stockissue';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.apiUrl}/api/Product/SelectAll`);
  }


  getAllByBranch() {
    return this.http.get(`${environment.apiUrl}/api/Product/SelectAllStockByBranchnew`);
  }
  getAllbySupp() {
    return this.http.get(`${environment.apiUrl}/api/Product/SelectAllByProSup`);
  }
  Create(model) {
    return this.http.post(`${environment.apiUrl}/api/Product/create`, model);
}
udate(model) {
  return this.http.post(`${environment.apiUrl}/api/Product/Update`, model);
}
findId(Id: string) {
  return this.http.get(`${environment.apiUrl}/api/Product/FindId?id=`+Id);
}
delete(model: Product) {
  return this.http.post(`${environment.apiUrl}/api/Product/Delete`, model);
}
StockIssue(model: Stockissue) {
  return this.http.post(`${environment.apiUrl}/api/Product/StockIssue`, model);
}
getAllProductFilter(productname: string,categoryname: string,subcategory:string,uomname: string,sexpireed:string,eexpireed:string) {
  return this.http.get(`${environment.apiUrl}/api/Product/SelectAllfilter?productname=${productname}&categoryname=${categoryname}&categoryname=${categoryname}&subcategory=${subcategory}&uomname=${uomname}&sexpired=${sexpireed}&eexpired=${eexpireed}`);
}
getAllStockFilter(productname: string,categoryname: string,subcategory:string,uomname: string,expireed:string) {
  return this.http.get(`${environment.apiUrl}/api/Product/SelectAllfilter?productname=${productname}&categoryname=${categoryname}&categoryname=${categoryname}&subcategory=${subcategory}&uomname=${uomname}&expired=${expireed}`);
}
getAllStockIssueFilter(productname: string,categoryname: string,subcategory:string,uomname: string,expireed:string) {
  return this.http.get(`${environment.apiUrl}/api/Product/SelectStockIssuefilter?productname=${productname}&categoryname=${categoryname}&categoryname=${categoryname}&subcategory=${subcategory}&uomname=${uomname}&expired=${expireed}`);
}
//Inside a service class
downloadPdf (productname: string,categoryname: string,subcategory:string,uomname: string,sexpireed:string,eexpireed:string): Observable<Blob>  {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/Product/rptProductlist?productname=${productname}&categoryname=${categoryname}&categoryname=${categoryname}&subcategory=${subcategory}&uomname=${uomname}&sexpired=${sexpireed}&eexpired=${eexpireed}`, {
    responseType: 'blob' 
  });
}
//Inside a service class
StockdownloadPdf (productname: string,categoryname: string,subcategory:string,uomname: string,expireed:string): Observable<Blob>  {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/Product/rptProductStocklist?productname=${productname}&categoryname=${categoryname}&categoryname=${categoryname}&subcategory=${subcategory}&uomname=${uomname}&expired=${expireed}`, {
    responseType: 'blob' 
  });
}
StockPdf (productname: string,categoryname: string,subcategory:string,rptType:string): Observable<Blob>  {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/Product/rptStocklist?productname=${productname}&categoryname=${categoryname}&categoryname=${categoryname}&subcategory=${subcategory}&rptType=${rptType}`, {
    responseType: 'blob' 
  });
}
StockIssuePdf (productname: string,categoryname: string,subcategory:string,rptType:string): Observable<Blob>  {
  let headers = new Headers();
  headers.append("Accept", "application/pdf");
  return this.http.get(`${environment.apiUrl}/api/Product/rptStocklist?productname=${productname}&categoryname=${categoryname}&categoryname=${categoryname}&subcategory=${subcategory}&rptType=${rptType}`, {
    responseType: 'blob' 
  });
}

getAllReorderingLevel(){
  return this.http.get(`${environment.apiUrl}/api/Product/SelectAllReorderingLevel`);
}

}