import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { ExamsComponent } from "./exams.component";
import { ExamsListComponent } from "./exams-list/exams-list.component";
import { ExamsFormComponent } from "./exams-form/exams-form.component";

const examsRoutes: Routes = [
    {
        path: '',
        component: ExamsComponent,
        data: {
            title: 'pages.exams.title',
            breadcrumb: 'pages.exams.title'
        },
        children: [
            {
                path: '',
                component: ExamsListComponent,
                data: {
                    title: 'pages.exams.title',
                    showAddButton: true,
                    addButtonLink: 'add'
                }
            },
            {
                path: 'add',
                component: ExamsFormComponent,
                data: {
                    title: 'pages.exams.permissions.add',
                    breadcrumb: 'pages.exams.permissions.add'
                }
            },
            {
                path: 'edit/:examId',
                component: ExamsFormComponent,
                data: {
                    title: 'pages.exams.permissions.edit',
                    breadcrumb: 'pages.exams.permissions.edit'
                }
            },
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(examsRoutes)],
    exports: [RouterModule]
})
export class ExamsRoutingModule { }