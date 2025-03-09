import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ILinkSocial } from '@shared/types/entities/domain/links';

@Component({
  selector: 'app-social-link',
  templateUrl: './social-link.component.html',
  styleUrl: './social-link.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialLinkComponent {
  @Input() item?: ILinkSocial;
}
