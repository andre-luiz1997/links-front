import { NgModule } from "@angular/core";
import { RouterModule, type Routes } from "@angular/router";
import { RolesComponent } from "./roles.component";
import { RolesListComponent } from "./roles-list/roles-list.component";
import { RoleFormComponent } from "./role-form/role-form.component";

const rolesRoutes: Routes = [
    {
        path: '',
        component: RolesComponent,
        data: {
            title: 'pages.roles.title',
            breadcrumb: 'pages.roles.title'
        },
        children: [
            {
                path: '',
                component: RolesListComponent,
                data: {
                    title: 'pages.roles.title',
                    breadcrumb: 'pages.roles.title'
                }
            },
            {
                path: 'add',
                component: RoleFormComponent,
                data: {
                    title: 'pages.roles.permissions.add',
                    breadcrumb: 'pages.roles.permissions.add'
                }
            },
            {
                path: 'edit/:roleId',
                component: RoleFormComponent,
                data: {
                    title: 'pages.roles.permissions.edit',
                    breadcrumb: 'pages.roles.permissions.edit'
                }
            }
        ]
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(rolesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class RolesRoutingModule { }