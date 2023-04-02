import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Role } from '../_models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  constructor(  private router: Router,
    private http: HttpClient) { }

  getAll() {
    return this.http.get(`${environment.apiUrl}/api/accounts/roles`);
  }
Create(model: Role) {
    return this.http.post(`${environment.apiUrl}/api/accounts/CreateRole`, model);
}
update(model: Role) {
  return this.http.post(`${environment.apiUrl}/api/accounts/UpdateRole`, model);
}
Delete(model: Role) {
  return this.http.post(`${environment.apiUrl}/api/accounts/deleteRole`, model);
}
}
