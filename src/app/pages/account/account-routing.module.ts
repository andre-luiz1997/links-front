import { RouterModule, Routes } from "@angular/router";
import { AccountComponent } from "./account.component";
import { NgModule } from "@angular/core";

const accountRoutes: Routes = [
    {
        path: '',
        component: AccountComponent,
        data: {
            title: 'pages.account.title',
            breadcrumb: 'pages.account.title'
        }
    }
]
@NgModule({
    imports: [
        RouterModule.forChild(accountRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AccountRoutingModule { }