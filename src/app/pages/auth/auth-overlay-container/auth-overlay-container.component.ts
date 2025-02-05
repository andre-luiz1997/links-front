import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-auth-overlay-container',
  template: `<div class="container"><img src="assets/img/dna2.jpg" /></div>`,
  styleUrl: './auth-overlay-container.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthOverlayContainerComponent {
}
