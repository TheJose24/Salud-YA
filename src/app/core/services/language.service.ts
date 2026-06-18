import { effect, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {
  AVAILABLE_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  LanguageCode,
} from '../models/language.model';

/** Idioma actual: persistido y sincronizado con ngx-translate (runtime). */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translate = inject(TranslateService);

  readonly languages = AVAILABLE_LANGUAGES;

  private readonly _current = signal<LanguageCode>(this.resolveInitial());
  readonly current = this._current.asReadonly();

  constructor() {
    this.translate.addLangs(this.languages.map(language => language.code));
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);

    // Aplica y persiste al cambiar.
    effect(() => {
      const code = this._current();
      this.translate.use(code);
      localStorage.setItem(LANGUAGE_STORAGE_KEY, code);
    });
  }

  setLanguage(code: LanguageCode): void {
    this._current.set(code);
  }

  private resolveInitial(): LanguageCode {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return stored && this.isSupported(stored) ? stored : DEFAULT_LANGUAGE;
  }

  private isSupported(code: string): code is LanguageCode {
    return this.languages.some(language => language.code === code);
  }
}
