import { RouterModule, type Routes } from "@angular/router"
import { ReferenceValuesComponent } from "./reference-values.component"
import { NgModule } from "@angular/core"
import { ReferenceValuesListComponent } from "./reference-values-list/reference-values-list.component"
import { ReferenceValuesFormComponent } from "./reference-values-form/reference-values-form.component"

export const referenceValuesRoutes: Routes = [
    {
        path: 'reference-values/:examTypeId',
        component: ReferenceValuesComponent,
        data: {
            title: 'pages.reference_values.title',
            breadcrumb: ':examTypeId'
        },
        children: [
            {
                path: '',
                component: ReferenceValuesListComponent,
                data: {
                    title: 'pages.reference_values.title',
                    breadcrumb: 'pages.reference_values.title',
                    showAddButton: true,
                    addButtonLink: 'add'
                }
            },
            {
                path: 'add',
                component: ReferenceValuesFormComponent,
                data: {
                    title: 'pages.reference_values.permissions.add',
                    breadcrumb: 'pages.reference_values.permissions.add'
                }
            },
            {
                path: 'edit/:referenceValueId',
                component: ReferenceValuesFormComponent,
                data: {
                    title: 'pages.reference_values.permissions.edit',
                    breadcrumb: 'pages.reference_values.permissions.edit'
                }
            },
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(referenceValuesRoutes)],
    exports: [RouterModule]
})
export class ReferenceValuesRoutingModule {}
