import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { EnvGlobalSetup } from '../../_models/setup/globalsetup';


@Injectable({
  providedIn: 'root'
})
export class GlobalsetupService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
     
    return this.http.get(`${environment.apiUrl}/api/GlobalSetup/SelectAll`);
  }

update(model: EnvGlobalSetup) {
  return this.http.post(`${environment.apiUrl}/api/GlobalSetup/Update`, model);
}
}