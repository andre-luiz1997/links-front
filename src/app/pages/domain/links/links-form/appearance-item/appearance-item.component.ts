import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { LinkConfigurationTheme } from '@shared/types/entities/domain/links';

@Component({
  selector: 'app-appearance-item',
  templateUrl: './appearance-item.component.html',
  styleUrl: './appearance-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppearanceItemComponent {
  @Input() theme!: LinkConfigurationTheme;
  @Input() selected: boolean = false;
}
