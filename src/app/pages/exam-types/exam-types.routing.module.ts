import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { ExamTypesComponent } from "./exam-types.component";
import { ExamTypesListComponent } from "./exam-types-list/exam-types-list.component";

const examTypesRoutes: Routes = [
    {
        path: '',
        component: ExamTypesComponent,
        data: {
            title: 'pages.exam-types.title',
            breadcrumb: 'pages.exam-types.title'
        },
        children: [
            {
                path: '',
                component: ExamTypesListComponent,
                data: {
                    title: 'pages.exam-types.title',
                }
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(examTypesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class ExamTypesRoutingModule {}