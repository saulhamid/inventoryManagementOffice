import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import {  userlistComponent } from './userlist.component';
import { rolselistComponent } from './rolselist.component';
import { LayoutComponent } from '../pages/layout/layout.component';
import { ManupermissionComponent } from './manupermission/manupermission.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'user', component: userlistComponent },
            { path: 'userCreate', component: RegisterComponent },
            { path: 'role', component: rolselistComponent },
            { path: 'usermenu', component: ManupermissionComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }