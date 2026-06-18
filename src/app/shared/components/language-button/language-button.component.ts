import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

/** Botón de cabecera que muestra el idioma actual y abre la pantalla de idioma. */
@Component({
  selector: 'app-language-button',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      routerLink="/idioma"
      class="flex h-10 items-center gap-1.5 rounded-full bg-slate-100 px-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200"
      [attr.aria-label]="'language.title' | translate"
    >
      <i class="ri-global-line"></i>
      {{ currentLang().toUpperCase() }}
    </a>
  `,
})
export class LanguageButtonComponent {
  private readonly language = inject(LanguageService);
  readonly currentLang = this.language.current;
}
