import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import { LinksComponent } from "./links.component";
import { LinksListComponent } from "./links-list/links-list.component";
import { LinksFormComponent } from "./links-form/links-form.component";

export const linksRoutes: Routes = [
    {
        path: '',
        component: LinksComponent,
        data: {
            title: 'pages.links.title',
            breadcrumb: 'pages.links.title'
        },
        children: [
            {
                path: '',
                component: LinksListComponent,
                data: {
                    title: 'pages.links.title',
                    breadcrumb: 'pages.links.title'
                }
            },
            {
                path: 'add',
                component: LinksFormComponent,
                data: {
                    title: 'pages.links.permissions.add',
                    breadcrumb: 'pages.links.permissions.add'
                }
            },
            {
                path: 'edit/:linkId',
                component: LinksFormComponent,
                data: {
                    title: 'pages.links.permissions.edit',
                    breadcrumb: 'pages.links.permissions.edit'
                }
            }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(linksRoutes)
    ],
    exports: [RouterModule]
})
export class LinksRoutingModule {}