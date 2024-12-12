import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { LabsComponent } from "./labs.component";
import { LabsListComponent } from "./labs-list/labs-list.component";
import { LabsFormComponent } from "./labs-form/labs-form.component";

const labsRoutes: Routes = [
    {
        path: '',
        component: LabsComponent,
        data: {
            title: 'pages.labs.title',
            breadcrumb: 'pages.labs.title'
        },
        children: [
            {
                path: '',
                component: LabsListComponent,
                data: {
                    title: 'pages.labs.title'
                }
            },
            {
                path: 'add',
                component: LabsFormComponent,
                data: {
                    title: 'pages.labs.permissions.add',
                    breadcrumb: 'pages.labs.permissions.add'
                }
            },
            {
                path: 'edit/:labId',
                component: LabsFormComponent,
                data: {
                    title: 'pages.labs.permissions.edit',
                    breadcrumb: 'pages.labs.permissions.edit'
                }
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(labsRoutes)],
    exports: [RouterModule]
})
export class LabsRoutingModule { }