import { ChangeDetectionStrategy, Component, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ILinkProfile } from '@shared/types/entities/domain/links';
import { getPublicAsset } from '@shared/utils/common';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent implements OnChanges {
  @Input() profile?: ILinkProfile | any;
  @Input() showProfileImage: boolean = true;
  @Input() size: 'small' | 'large' = 'large';
  
  profileImage?: string;

  @HostBinding('class')
  get hostClass() {
    return {
      [this.size]: true
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['profile'] && this.profile) {
      if(this.profile.image?.name) {
        this.profileImage = getPublicAsset(this.profile.image.name);
      } else {
        this.profileImage = undefined;
      }

    }
  }
}
