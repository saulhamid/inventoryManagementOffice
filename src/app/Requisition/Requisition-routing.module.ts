import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../pages/layout/layout.component';
import { RequisitionapprovedComponent } from './requisitionapproved/requisitionapproved.component';
import { RequisitionlistComponent } from './Requisitionlist/Requisitionlist.component';
import { RequisitionalertComponent } from "./requisitionalert/requisitionalert.component";
import { RequisitionprevreportComponent } from "./Requisitionprevreport/Requisitionprevreport.component";
import { RequisitionapprovedsecondComponent } from "./requisitionapprovedSecond/requisitionapprovedsecond.component";
import { RequisitionapprovedthirdComponent } from "./requisitionapprovedThird/requisitionapprovedthird.component";


const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'requisitionlist', component: RequisitionlistComponent },
            { path: 'requisitionApproved', component: RequisitionapprovedComponent },
            { path: 'requisitionAlert', component: RequisitionalertComponent },
            { path: 'requisitionPrevReport', component: RequisitionprevreportComponent },
            { path: 'requisitionApprovedSecond', component: RequisitionapprovedsecondComponent },
            { path: 'requisitionApprovedThird', component: RequisitionapprovedthirdComponent
         },
 
      
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RequisitionRoutingModule { }
