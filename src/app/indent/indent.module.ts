import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndentlistComponent } from './indentlist/indentlist.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbCardModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbIconModule, NbDatepickerModule, NbInputModule, NbDialogModule, NbSelectModule, NbAutocompleteModule } from '@nebular/theme';
import { indentRoutingModule } from './indent-routing.module';
import { IndentapprovedComponent } from './indentapproved/indentapproved.component';
import { IndenttopoComponent } from './indenttopo/indenttopo.component';
import { DataTablesModule } from 'angular-datatables';
import { InreportComponent } from './inreport/inreport.component';
import { ProcurmentapproveComponent } from './procurmentapprove/procurmentapprove.component';
import { RequirmentAnalysisComponent } from './requirmentAnalysis/requirmentAnalysis.component';
import { IndenttoponewComponent } from "./indenttoponew/indenttoponew.component";
//import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

@NgModule({
  declarations: [IndentlistComponent, IndentapprovedComponent,IndenttopoComponent, InreportComponent, ProcurmentapproveComponent,RequirmentAnalysisComponent, IndenttoponewComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    indentRoutingModule,
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
NbDialogModule,
DataTablesModule,
NbSelectModule,
NbAutocompleteModule,

  ],
})
export class IndentModule { }
