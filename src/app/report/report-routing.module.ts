import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../pages/layout/layout.component';



const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
          
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class reportRoutingModule { }
