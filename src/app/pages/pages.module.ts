import { NgModule } from '@angular/core';
import { NbListModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { SetupModule } from '../setup/setup-module';
import { IndentModule } from '../indent/indent.module';
import { PurchaseModule } from '../purchase/purchase.module';
import { StockModule } from '../stock/stock.module';
import { CommonModule } from '@angular/common';
import { RequisitionModule } from '../Requisition/Requisition.module';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    SetupModule,
    IndentModule,
    RequisitionModule,
    PurchaseModule,
    DataTablesModule,
    StockModule,
    NbListModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
