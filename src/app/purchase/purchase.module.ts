import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseorderComponent } from './purchaseorder/purchaseorder.component';
import { PurchasearrivedComponent } from './purchasearrived/purchasearrived.component';
import { PurchaseqaComponent } from './purchaseqa/purchaseqa.component';
import { purchaseRoutingModule } from './purchase-routing.module';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbCardModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbIconModule, NbDatepickerModule, NbInputModule, NbSelectModule, NbAutocompleteModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { PurchaselistComponent } from './purchaselist/purchaselist.component';
import { PurchaereturnlistComponent } from './purchaereturnlist/purchaereturnlist.component';
import { DataTablesModule } from 'angular-datatables';
import { PureportComponent } from './pureport/pureport.component';
import { PurorderreportComponent } from './purorderreport/purorderreport.component';
import { PurchaeavglistComponent } from './purchaeavglist/purchaeavglist.component';

@NgModule({
  declarations: [PurchaseorderComponent, PurchasearrivedComponent, PurchaseqaComponent, PurchaselistComponent, PurchaereturnlistComponent, PureportComponent, PurorderreportComponent, PurchaeavglistComponent],
  imports: [
    CommonModule,
    purchaseRoutingModule,
    ReactiveFormsModule,
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
    NbSelectModule,
    DataTablesModule,
    NbAutocompleteModule
  ]
})
export class PurchaseModule { }
