import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from '../pages/layout/layout.component';
import { IndentlistComponent } from './indentlist/indentlist.component';
import { IndentapprovedComponent } from './indentapproved/indentapproved.component';
import { IndenttopoComponent } from './indenttopo/indenttopo.component';
import { InreportComponent } from './inreport/inreport.component';
import { ProcurmentapproveComponent } from './procurmentapprove/procurmentapprove.component';
import { RequirmentAnalysisComponent } from './requirmentAnalysis/requirmentAnalysis.component';
import { IndenttoponewComponent } from "./indenttoponew/indenttoponew.component";

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'indentlist', component: IndentlistComponent },
            { path: 'indentapproved', component: IndentapprovedComponent },
            { path: 'indenttopo', component: IndenttopoComponent },
            { path: 'indentreport', component: InreportComponent },
            { path: 'indentProcurment', component: ProcurmentapproveComponent },
            { path: 'requirmentAnalysis', component: RequirmentAnalysisComponent },
            { path: 'indenttoponew', component: IndenttoponewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class indentRoutingModule { }
