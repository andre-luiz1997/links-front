import { RouterModule, Routes } from "@angular/router"
import { ReferenceValuesComponent } from "./reference-values.component"
import { NgModule } from "@angular/core"
import { ReferenceValuesListComponent } from "./reference-values-list/reference-values-list.component"

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
                    breadcrumb: 'pages.reference_values.title'
                }
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(referenceValuesRoutes)],
    exports: [RouterModule]
})
export class ReferenceValuesRoutingModule {}
