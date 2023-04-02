import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../@theme/theme.module';
import { NbTabsetModule, NbRouteTabsetModule, NbStepperModule, NbCardModule, NbButtonModule, NbListModule, NbAccordionModule, NbUserModule, NbIconModule, NbDatepickerModule, NbInputModule, NbSelectModule, NbAutocompleteModule } from '@nebular/theme';
import { SetupRoutingModule } from './setup-routing.module';
import { CompanyComponent } from './company/company/company.component';
import { CategoryComponent } from './category/category/category.component';
import { DepartmentComponent } from './department/department.component';
import { SectionComponent } from './section/section.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { UOMComponent } from './uom/uom.component';
import { SupplierComponent } from './supplier/supplier.component';
import { BranchComponent } from './branch/branch.component';
import { ProductComponent } from './product/product.component';
import { CustomerComponent } from './customer/customer.component';
import { EmployeeComponent } from './employee/employee.component';
import { designationComponent } from './designation/designation.component';
import { SupplierproductComponent } from './supplierproduct/supplierproduct.component';
import { TermconditionComponent } from './termcondition/termcondition.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DataTablesModule } from 'angular-datatables';
import { GlobalsetupComponent } from './globalsetup/globalsetup.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SetupRoutingModule,
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
  NbCardModule,
  ThemeModule,
  CKEditorModule,
  NbSelectModule,
  DataTablesModule,
  NbAutocompleteModule,

    ],
    declarations: [
        CompanyComponent,
        BranchComponent,
        CategoryComponent,
        DepartmentComponent,
        SectionComponent,
        SubcategoryComponent,
        UOMComponent,
        SupplierComponent,
        ProductComponent,
        CustomerComponent,
        EmployeeComponent,
        designationComponent,
        SupplierproductComponent,
        TermconditionComponent,
        GlobalsetupComponent
    ]
})
export class SetupModule { }
