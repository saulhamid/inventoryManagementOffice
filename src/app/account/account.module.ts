import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { rolselistComponent } from './rolselist.component';
import { userlistComponent } from './userlist.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbCardModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbIconModule, NbDatepickerModule, NbInputModule, NbCheckboxModule, NbTreeGridModule } from '@nebular/theme';
import { ManupermissionComponent } from './manupermission/manupermission.component';
import { TreeModule } from '@circlon/angular-tree-component';
//import { ManupermissionComponent } from './manupermission/manupermission.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule,

FormsModule,
ReactiveFormsModule,
ThemeModule,
NbTabsetModule,
NbRouteTabsetModule,
NbStepperModule,
NbCardModule,
NbButtonModule,
NbListModule,
NbAccordionModule,
NbUserModule,
NbIconModule,
NbDatepickerModule,
NbInputModule,
NbCheckboxModule,
NbTreeGridModule, TreeModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        rolselistComponent,
        userlistComponent,
        ManupermissionComponent
    ]
})
export class AccountModule { }