import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ILinkConfiguration, ILinkItem } from '@shared/types/entities/domain/links';

@Component({
  selector: 'app-landing-page-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page-link.component.html',
  styleUrl: './landing-page-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageLinkComponent {
  @Input() item!: ILinkItem;
  @Input() configuration!: ILinkConfiguration;

  onClick() {
    if(this.item.url) {
      window.open(this.item.url,'_blank');
    }
  }
}
