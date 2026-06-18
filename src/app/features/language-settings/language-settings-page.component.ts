import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { LanguageCode } from '../../core/models/language.model';
import { LanguageService } from '../../core/services/language.service';
import { HeaderComponent } from '../../shared/components/app-header/app-header.component';

/** Personalización de Idioma. Cambio en runtime, persistido. */
@Component({
  selector: 'app-language-settings-page',
  standalone: true,
  imports: [TranslateModule, HeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header titleKey="language.title" [showBack]="true" (back)="goBack()" />

    <main class="mx-auto w-full max-w-2xl animate-fade-in space-y-4 p-4 sm:p-6">
      <p class="text-slate-500">{{ 'language.subtitle' | translate }}</p>

      <div class="space-y-3">
        @for (lang of languages; track lang.code) {
          <button
            type="button"
            (click)="select(lang.code)"
            [attr.aria-pressed]="current() === lang.code"
            class="flex w-full items-center gap-4 rounded-2xl border-2 bg-white p-4 text-left transition active:scale-[0.99]"
            [class]="
              current() === lang.code
                ? 'border-primary shadow-card'
                : 'border-slate-100 hover:border-slate-200'
            "
          >
            <span
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              [class]="
                current() === lang.code ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
              "
            >
              <i class="text-2xl" [class]="lang.icon"></i>
            </span>

            <span class="min-w-0 flex-1">
              <span class="block text-lg font-extrabold text-slate-800">{{ lang.nativeName }}</span>
              <span class="block text-sm text-slate-500">{{ lang.spanishName }}</span>
            </span>

            @if (current() === lang.code) {
              <i class="ri-checkbox-circle-fill text-2xl text-primary"></i>
            }
          </button>
        }
      </div>
    </main>
  `,
})
export class LanguageSettingsPageComponent {
  private readonly language = inject(LanguageService);
  private readonly location = inject(Location);

  readonly languages = this.language.languages;
  readonly current = this.language.current;

  select(code: LanguageCode): void {
    this.language.setLanguage(code);
  }

  goBack(): void {
    this.location.back();
  }
}
