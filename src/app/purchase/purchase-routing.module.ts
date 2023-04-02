import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../pages/layout/layout.component';
import { PurchaseorderComponent } from './purchaseorder/purchaseorder.component';
import { PurchasearrivedComponent } from './purchasearrived/purchasearrived.component';
import { PurchaseqaComponent } from './purchaseqa/purchaseqa.component';
import { PurchaselistComponent } from './purchaselist/purchaselist.component';
import { PurchaereturnlistComponent } from './purchaereturnlist/purchaereturnlist.component';
import { PureportComponent } from './pureport/pureport.component';
import { PurorderreportComponent } from './purorderreport/purorderreport.component';
import { PurchaeavglistComponent } from './purchaeavglist/purchaeavglist.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'purchaseorder', component: PurchaseorderComponent },
            { path: 'purchasearrived', component: PurchasearrivedComponent },
            { path: 'purchaseqa', component: PurchaseqaComponent },
            { path: 'purchaselist', component: PurchaselistComponent },
            { path: 'purchasereturnlist', component: PurchaereturnlistComponent },
            { path: 'purchasereport', component: PureportComponent },
            { path: 'purchaseorderreport', component: PurorderreportComponent },
            { path: 'purchaeavglist', component: PurchaeavglistComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class purchaseRoutingModule { }
