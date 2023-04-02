import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { reportRoutingModule } from './report-routing.module';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbCardModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbIconModule, NbDatepickerModule, NbInputModule } from '@nebular/theme';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ThemeModule } from '../@theme/theme.module';
import { DataTablesModule } from 'angular-datatables';
import { IndentComponent } from './indent/indent.component';
import { PurchasereportComponent } from './purchasereport/purchasereport.component';

@NgModule({
  declarations: [IndentComponent, PurchasereportComponent],
  imports: [
    CommonModule,
    reportRoutingModule,
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
    DataTablesModule
  ]
})
export class ReportModule { }
