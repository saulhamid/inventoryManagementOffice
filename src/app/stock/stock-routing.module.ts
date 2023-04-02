import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../pages/layout/layout.component';
import { StockIssueComponent } from './stockIssue/stockIssue.component';
import { StockIssueNewComponent } from './stockIssuenew/stockIssuenew.component';
import { StockIssueapprovedComponent } from './stockIssueapproved/stockIssueapproved.component';
import { StockIssueReportComponent } from './stockIssuereport/stockIssuereport.component';
import { StocklistComponent } from './stocklist/stocklist.component';
import { stocktransferlistComponent } from './stocktransfer/stocktransferlist.component';
import { stocktransferlistnewComponent } from './StocktransferNew/stocktransferlistnew.component';

import { stocktransferapprovedComponent } from './stocktransferapproved/stocktransferapproved.component';
import { stocktransferreceiveComponent } from './stocktransferreceive/stocktransferreceive.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'stocklist', component: StocklistComponent },
            { path: 'stockIssue', component: StockIssueComponent },
            { path: 'stockIssuereport', component: StockIssueReportComponent },
            { path: 'stockTransfer', component: stocktransferlistComponent },
            { path: 'stockTransferNew', component: stocktransferlistnewComponent },
            { path: 'stockTransferapprove', component: stocktransferapprovedComponent },
            { path: 'stockTransferreceive', component: stocktransferreceiveComponent },
            { path: 'stockIssuenew', component: StockIssueNewComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class stockRoutingModule { }
