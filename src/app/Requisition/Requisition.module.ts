import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbCardModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbIconModule, NbDatepickerModule, NbInputModule, NbDialogModule, NbSelectModule, NbAutocompleteModule } from '@nebular/theme';

import { DataTablesModule } from 'angular-datatables';
import { RequisitionlistComponent } from './Requisitionlist/Requisitionlist.component';
import { RequisitionRoutingModule } from './Requisition-routing.module';
import { RequisitionapprovedComponent } from './requisitionapproved/requisitionapproved.component';
import { RequisitionalertComponent } from './requisitionalert/requisitionalert.component';
import { RequisitionprevreportComponent } from "./Requisitionprevreport/Requisitionprevreport.component";
import { RequisitionapprovedsecondComponent } from "./requisitionapprovedSecond/requisitionapprovedsecond.component";
import { RequisitionapprovedthirdComponent } from "./requisitionapprovedThird/requisitionapprovedthird.component";



@NgModule({
  declarations: [RequisitionlistComponent,RequisitionapprovedComponent,RequisitionalertComponent, RequisitionprevreportComponent, RequisitionapprovedsecondComponent, RequisitionapprovedthirdComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RequisitionRoutingModule,
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
export class RequisitionModule { }
