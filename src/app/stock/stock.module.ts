import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { stockRoutingModule } from './stock-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbCardModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbIconModule, NbDatepickerModule, NbInputModule, NbSelectModule, NbAutocompleteModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { StocklistComponent } from './stocklist/stocklist.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DataTablesModule } from 'angular-datatables';
import { StockIssueComponent } from './stockIssue/stockIssue.component';
import { StockIssueNewComponent } from './stockIssuenew/stockIssuenew.component';
import { StockIssueReportComponent } from './stockIssuereport/stockIssuereport.component';
import { StockIssueapprovedComponent } from './stockIssueapproved/stockIssueapproved.component';
import { stocktransferlistComponent } from './stocktransfer/stocktransferlist.component';
import { stocktransferlistnewComponent } from './StocktransferNew/stocktransferlistnew.component';
import { stocktransferapprovedComponent } from './stocktransferapproved/stocktransferapproved.component';
import { stocktransferreceiveComponent } from './stocktransferreceive/stocktransferreceive.component';
@NgModule({
  declarations: [ StocklistComponent,StockIssueComponent,StockIssueReportComponent,StockIssueapprovedComponent,stocktransferlistComponent,
    stocktransferlistnewComponent,stocktransferapprovedComponent,
    stocktransferreceiveComponent, StockIssueNewComponent],
  imports: [
    CommonModule,
    stockRoutingModule,
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
  NbCardModule,
  ThemeModule,
  CKEditorModule,
  NbSelectModule,
  DataTablesModule,
  NbAutocompleteModule,
  ]
})
export class StockModule { }
