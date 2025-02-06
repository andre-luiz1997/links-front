import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PlansComponent } from "./plans.component";
import { PlansFormComponent } from "./plans-form/plans-form.component";
import { PlansListComponent } from "./plans-list/plans-list.component";

const plansRoutes: Routes = [
    {
        path: '',
        component: PlansComponent,
        data: {
            title: 'pages.plans.title',
            breadcrumb: 'pages.plans.title'
        },
        children: [
            {
                path: '',
                component: PlansListComponent,
                data: {
                    title: 'pages.plans.title'
                }
            },
            {
                path: 'add',
                component: PlansFormComponent,
                data: {
                    title: 'pages.plans.permissions.add',
                    breadcrumb: 'pages.plans.permissions.add'
                }
            },
            {
                path: 'edit/:planId',
                component: PlansFormComponent,
                data: {
                    title: 'pages.plans.permissions.edit',
                    breadcrumb: 'pages.plans.permissions.edit'
                }
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(plansRoutes)],
    exports: [RouterModule]
})
export class PlansRoutingModule { }