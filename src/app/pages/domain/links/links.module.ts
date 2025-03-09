import { NgModule } from "@angular/core";
import { LinksComponent } from "./links.component";
import { CommonModule } from "@angular/common";
import { phosporDefaultIcons, SharedModule } from "@shared/index";
import { LinksRoutingModule } from "./links-routing.module";
import { TooltipModule } from "primeng/tooltip";
import { NgIconsModule } from "@ng-icons/core";
import { faBrandFacebook, faBrandInstagram, faBrandTiktok, faBrandTwitter, faBrandXTwitter, faBrandYoutube } from '@ng-icons/font-awesome/brands';
import { TranslatePipe } from "@shared/pipes/translate.pipe";
import { LinksListComponent } from "./links-list/links-list.component";
import { LinksFormComponent } from "./links-form/links-form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { TabsModule } from "primeng/tabs";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { phosphorArrowSquareOut, phosphorCheck, phosphorCopy, phosphorDownload, phosphorEnvelopeSimple, phosphorLink, phosphorPaintBucket, phosphorPhone, phosphorWhatsappLogo, phosphorWrench } from "@ng-icons/phosphor-icons/regular";
import { DialogModule } from "primeng/dialog";
import { CdkDrag, CdkDropList } from "@angular/cdk/drag-drop";
import { PaginatorModule } from "primeng/paginator";
import { SkeletonModule } from "primeng/skeleton";
import { SpeedDialModule } from "primeng/speeddial";
import { AppearanceItemComponent } from "./links-form/appearance-item/appearance-item.component";
import { CapitalizePipe } from "@shared/pipes/capitalize.pipe";
import { QRCodeModule } from "angularx-qrcode";

export const SocialMediaIcons = {
    faBrandFacebook,
    faBrandInstagram,
    faBrandTwitter,
    faBrandTiktok,
    faBrandYoutube,
    faBrandXTwitter
}

@NgModule({
    declarations: [LinksComponent, LinksListComponent, LinksFormComponent, AppearanceItemComponent],
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
        CapitalizePipe,
        QRCodeModule,
        NgIconsModule.withIcons({
            ...phosporDefaultIcons,
            phosphorEnvelopeSimple,
            phosphorWhatsappLogo,
            phosphorPhone,
            phosphorLink,
            phosphorPaintBucket,
            phosphorWrench,
            phosphorCheck,
            phosphorArrowSquareOut,
            phosphorCopy,
            phosphorDownload,
            ...SocialMediaIcons
        })],
})
export class LinksModule { }