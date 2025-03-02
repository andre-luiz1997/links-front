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
import { TabsModule } from "primeng/tabs";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { phosphorEnvelopeSimple, phosphorLink, phosphorPaintBucket, phosphorPhone, phosphorWhatsappLogo, phosphorWrench } from "@ng-icons/phosphor-icons/regular";
import { DialogModule } from "primeng/dialog";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { PaginatorModule } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";
import { SpeedDialModule } from "primeng/speeddial";

@NgModule({
    declarations: [LinksComponent, LinksListComponent, LinksFormComponent],
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
        PaginatorModule,
        TranslatePipe,
        LinksRoutingModule,
        TooltipModule,
        TabsModule,
        DialogModule,
        ToggleSwitchModule,
        SkeletonModule,
        SpeedDialModule,
        CdkDropList, CdkDrag,
        NgIconsModule.withIcons({
            ...phosporDefaultIcons,
            phosphorEnvelopeSimple,
            phosphorWhatsappLogo,
            phosphorPhone,
            phosphorLink,
            phosphorPaintBucket,
            phosphorWrench
        })],
})
export class LinksModule { }