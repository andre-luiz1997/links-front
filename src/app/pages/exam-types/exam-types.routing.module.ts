import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { ExamTypesComponent } from "./exam-types.component";
import { ExamTypesListComponent } from "./exam-types-list/exam-types-list.component";
import { ExamTypesFormComponent } from "./exam-types-form/exam-types-form.component";

const examTypesRoutes: Routes = [
    {
        path: '',
        component: ExamTypesComponent,
        data: {
            title: 'pages.exam_types.title',
            breadcrumb: 'pages.exam_types.title'
        },
        children: [
            {
                path: '',
                component: ExamTypesListComponent,
                data: {
                    title: 'pages.exam_types.title',
                }
            },
            {
                path: 'add',
                component: ExamTypesFormComponent,
                data: {
                    title: 'pages.exam_types.permissions.add',
                    breadcrumb: 'pages.exam_types.permissions.add'
                }
            },
            {
                path: 'edit/:examTypeId',
                component: ExamTypesFormComponent,
                data: {
                    title: 'pages.exam_types.permissions.edit',
                    breadcrumb: 'pages.exam_types.permissions.edit'
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