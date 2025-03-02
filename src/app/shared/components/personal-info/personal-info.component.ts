import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ILinkProfile } from '@shared/types/entities/domain/links';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent {
  @Input() profile?: ILinkProfile | any;
  @Input() size: 'small' | 'large' = 'large';

  @HostBinding('class')
  get hostClass() {
    return {
      [this.size]: true
    }
  }
}
