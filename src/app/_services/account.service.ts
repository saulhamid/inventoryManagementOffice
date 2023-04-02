import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { $ } from 'protractor';
import { User } from '../_models';
import { authdata } from '../_models/authdata';
import { environment } from '../../environments/environment';
import { Menus } from '../_models/menus';
/*
const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
'Accept': 'application/x-www-form-urlencoded',
'Access-Control-Allow-Headers': 'Content-Type'});
*/

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    private authdataSubject: BehaviorSubject<authdata>;
    public user: Observable<User>;
    public authdata: Observable<authdata>;
    private authtoken:string;
userdata=null;
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.authtoken=localStorage.getItem('authdataToken');
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }
    public get authValue(): string {
        return this.authtoken;
    }
    login(username, password,grant_type,companyId) {
        localStorage.removeItem('authdata');
        localStorage.removeItem('authdataToken');
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/x-www-form-urlencoded'
            })
          };
          const data = JSON.stringify({ username:username, password:password, grant_type:grant_type });
        return this.http.post<authdata>(`${environment.apiUrl}/oauth/token`,'?us='+companyId+'&username=' + username + '&password='+password+ '&grant_type='+grant_type+'&companyId='+companyId,
        httpOptions)
            .pipe(map(authdata => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('authdataToken', authdata.access_token);
                localStorage.setItem('authdata',JSON.stringify(authdata));
                this.authtoken=authdata.access_token;
                return authdata;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('authdata');
        localStorage.removeItem('authdataToken');
        this.authtoken=null;
        this.userSubject.next(null);
        this.router.navigate(['/auth/login']);
    }

    register(user: User) {
         
        return this.http.post(`${environment.apiUrl}/api/accounts/create`, user);
    }

    assignrole(user: User) {
        return this.http.post(`${environment.apiUrl}/api/accounts/assignrole`,user);
    }
    authHeader() {
        // return authorization header with basic auth credentials
        let user = JSON.parse(localStorage.getItem("authdata"));
      
        if (user) {
          return {  'Authorization': `Bearer ${localStorage.getItem('authdata')}`};
        } else {
          return {};
        }
      }

    getAll() {
        return this.http.get(`${environment.apiUrl}/api/accounts/GetUsersEmployee`);
    }

    updateUser(model: User) {
        return this.http.post(`${environment.apiUrl}/api/accounts/UpdateUser`, model);
      }

    getAllMenus(id) {
        return this.http.get(`${environment.apiUrl}/api/accounts/GetAllManus/${id}`);
    }
    getcurrentuser() {
        return this.http.get(`${environment.apiUrl}/api/accounts/GetCurrentUsers`);
    }
    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }
    deleteUser(id:string,params) {
        return this.http.post(`${environment.apiUrl}/deleteUser?id=${id}`,params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                   
                   
                    // publish updated user to subscribers
                }
                return x;
            }));
    }
    delete(id:string) {
        return this.http.delete(`${environment.apiUrl}/deleteUser?id=${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
    getusermenu(userId:string) {
        return this.http.get(`${environment.apiUrl}/api/userManus/GetAllPermissionManus/${userId}`);
    }
    Saveusermenu(menus:Menus[]) {
        return this.http.post(`${environment.apiUrl}/api/userManus/SaveMenu`, menus);
    }
}