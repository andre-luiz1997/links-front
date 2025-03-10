import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIconsModule, provideIcons } from '@ng-icons/core';
import { phosphorEnvelopeSimple, phosphorWhatsappLogo, phosphorPhone } from '@ng-icons/phosphor-icons/regular';
import { SharedModule } from '@shared/index';
import { LinksService } from '@shared/services/links.service';
import { ILinks } from '@shared/types/entities/domain/links';
import { isNotEmpty } from '@shared/utils/common';
import { delay } from 'rxjs';
import { LandingPageLinkComponent } from './landing-page-link/landing-page-link.component';
import { hexToRgba } from '@shared/utils/colors';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, SharedModule, NgIconsModule, LandingPageLinkComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({
    phosphorEnvelopeSimple,
    phosphorWhatsappLogo,
    phosphorPhone
  })]
})
export class LandingPageComponent implements OnInit {
  link = signal<ILinks | null>(null);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private route: ActivatedRoute,
    private linksService: LinksService,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token')
    if (isNotEmpty(token)) this.fetchLink(token)
  }

  fetchLink(token: string): void {
    this.isLoading.set(true);
    this.link.set(null);
    this.linksService.getOneByToken(token)
      .pipe(delay(1000)).subscribe({
        next: (res) => {
          this.link.set(res.data);
          this.isLoading.set(false);

          const config = this.link()?.configuration
          if (config?.theme === 'custom') {
            const root = this.el.nativeElement; // Ou document.documentElement para aplicar globalmente

            // Aplica as cores personalizadas, com valores padrão se não fornecidas
            if(config?.main_color) root.style.setProperty('--custom-main_color', config.main_color);
            if(config?.main_color) root.style.setProperty('--custom-main_color_rgba', hexToRgba(config.main_color, 0.5));
            if(config?.secondary_color) root.style.setProperty('--custom-secondary_color', config.secondary_color);
            if(config?.font_color) root.style.setProperty('--custom-font_color', config.font_color);
          }
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set('Erro ao buscar link');
        }
      })
  }
}
