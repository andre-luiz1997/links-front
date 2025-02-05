import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-auth-overlay-container',
  template: `<div class="container"><img src="assets/img/fullGradient.png" /><div class="inner-container"></div></div>`,
  styleUrl: './auth-overlay-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthOverlayContainerComponent {
}
