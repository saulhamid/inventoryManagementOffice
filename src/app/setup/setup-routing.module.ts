import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../pages/layout/layout.component';
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
import {GlobalsetupComponent} from './globalsetup/globalsetup.component'

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'company', component: CompanyComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'subcategory', component: SubcategoryComponent },
            { path: 'department', component: DepartmentComponent },
            { path: 'section', component: SectionComponent },
            { path: 'uom', component: UOMComponent },
            { path: 'supplier', component: SupplierComponent },
            { path: 'branch', component: BranchComponent },
            { path: 'product', component: ProductComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'employee', component: EmployeeComponent },
            { path: 'designation', component: designationComponent },
            { path: 'supplierproduct', component: SupplierproductComponent },
            { path: 'termsconditon', component: TermconditionComponent },
            { path: 'globalsetup', component: GlobalsetupComponent },

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SetupRoutingModule { }
