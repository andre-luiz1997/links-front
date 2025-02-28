import { NgModule } from "@angular/core";
import { LinksComponent } from "./links.component";
import { CommonModule } from "@angular/common";
import { phosporDefaultIcons, SharedModule } from "@shared/index";
import { LinksRoutingModule } from "./links-routing.module";
import { TooltipModule } from "primeng/tooltip";
import { NgIconsModule } from "@ng-icons/core";
import { TranslatePipe } from "@shared/pipes/translate.pipe";
import { LinksListComponent } from "./links-list/links-list.component";
import { LinksFormComponent } from "./links-form/links-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TableModule } from "primeng/table";
import { phosphorEnvelopeSimple, phosphorPhone, phosphorWhatsappLogo } from "@ng-icons/phosphor-icons/regular";

@NgModule({
    declarations: [LinksComponent, LinksListComponent, LinksFormComponent],
    imports: [
        CommonModule, SharedModule, ReactiveFormsModule, TableModule, TranslatePipe, LinksRoutingModule, TooltipModule, NgIconsModule.withIcons({ ...phosporDefaultIcons, phosphorEnvelopeSimple, phosphorWhatsappLogo, phosphorPhone })],
})
export class LinksModule { }