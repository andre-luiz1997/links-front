import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PlansRoutingModule } from "./plans.routing.module";
import { PlansComponent } from "./plans.component";
import { phosporDefaultIcons, SharedModule } from "@shared/index";
import { TooltipModule } from "primeng/tooltip";
import { TranslatePipe } from "@shared/pipes/translate.pipe";
import { ReactiveFormsModule } from "@angular/forms";
import { InputSwitchModule } from "primeng/inputswitch";
import { NgIconsModule } from "@ng-icons/core";
import { PlansFormComponent } from "./plans-form/plans-form.component";
import { SelectButtonModule } from "primeng/selectbutton";
import { PlansListComponent } from "./plans-list/plans-list.component";
import { TableModule } from "primeng/table";
import { CurrencyPipe } from "@shared/pipes/currency.pipe";

@NgModule({
    imports: [
        CommonModule,
        PlansRoutingModule,
        SharedModule,
        TooltipModule,
        TranslatePipe,
        CurrencyPipe,
        ReactiveFormsModule,
        InputSwitchModule,
        SelectButtonModule,
        TableModule,
        NgIconsModule.withIcons({
            ...phosporDefaultIcons
        })
    ],
    declarations: [
        PlansComponent,
        PlansFormComponent,
        PlansListComponent
    ],
})
export class PlansModule { }