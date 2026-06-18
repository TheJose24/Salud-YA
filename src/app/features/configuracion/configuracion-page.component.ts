import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { TextSize } from '../../core/models/settings.model';
import { SettingsService } from '../../core/services/settings.service';
import { HeaderComponent } from '../../shared/components/app-header/app-header.component';
import { LanguageButtonComponent } from '../../shared/components/language-button/language-button.component';
import { PinGateComponent } from './components/pin-gate.component';

/** Configuración de la Posta (container). Protegida por PIN de administrador. */
@Component({
  selector: 'app-configuracion-page',
  standalone: true,
  imports: [TranslateModule, HeaderComponent, LanguageButtonComponent, PinGateComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header titleKey="config.title" [showBack]="true" (back)="goBack()">
      <app-language-button actions />
    </app-header>

    <main class="mx-auto w-full max-w-2xl animate-fade-in space-y-4 p-4 sm:p-6">
      @if (!unlocked()) {
        <app-pin-gate
          [error]="pinError()"
          (submitted)="onUnlock($event)"
          (changed)="pinError.set(false)"
        />
      } @else {
        <!-- Volumen de voz -->
        <section class="rounded-2xl bg-white p-4 shadow-card">
          <div class="flex items-center gap-2">
            <i class="ri-volume-up-line text-xl text-primary"></i>
            <div>
              <h2 class="font-bold text-slate-800">{{ 'config.voice.title' | translate }}</h2>
              <p class="text-sm text-slate-500">{{ 'config.voice.desc' | translate }}</p>
            </div>
          </div>
          <div class="mt-4 flex items-center gap-3">
            <i class="ri-volume-down-line text-slate-400"></i>
            <input
              #vol
              type="range"
              min="0"
              max="100"
              step="5"
              [value]="volume()"
              (input)="onVolume(vol.value)"
              class="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-slate-200 accent-primary"
            />
            <span class="w-10 text-right text-sm font-bold text-slate-700">{{ volume() }}%</span>
          </div>
          <button
            type="button"
            (click)="testVoice()"
            class="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary-light px-4 py-2 text-sm font-bold text-primary transition hover:bg-emerald-100"
          >
            <i class="ri-play-circle-line"></i>
            {{ 'config.voice.test' | translate }}
          </button>
        </section>

        <!-- Tamaño de texto -->
        <section class="rounded-2xl bg-white p-4 shadow-card">
          <div class="flex items-center gap-2">
            <i class="ri-font-size text-xl text-primary"></i>
            <div>
              <h2 class="font-bold text-slate-800">{{ 'config.text.title' | translate }}</h2>
              <p class="text-sm text-slate-500">{{ 'config.text.desc' | translate }}</p>
            </div>
          </div>
          <div class="mt-4 grid grid-cols-3 gap-2">
            @for (opt of textSizes; track opt.value) {
              <button
                type="button"
                (click)="setText(opt.value)"
                class="rounded-xl border-2 py-3 font-bold transition"
                [class]="
                  textSize() === opt.value
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-slate-100 text-slate-600 hover:border-slate-200'
                "
              >
                {{ opt.labelKey | translate }}
              </button>
            }
          </div>
          <p class="mt-3 rounded-xl bg-slate-50 px-4 py-3 text-slate-700">
            {{ 'config.text.sample' | translate }}
          </p>
        </section>

        <!-- PIN de administrador -->
        <section class="rounded-2xl bg-white p-4 shadow-card">
          <div class="flex items-center gap-2">
            <i class="ri-lock-password-line text-xl text-primary"></i>
            <div>
              <h2 class="font-bold text-slate-800">{{ 'config.pin.title' | translate }}</h2>
              <p class="text-sm text-slate-500">{{ 'config.pin.desc' | translate }}</p>
            </div>
          </div>
          <label class="mt-4 block">
            <span class="text-sm font-bold text-slate-700">{{ 'config.pin.new' | translate }}</span>
            <input
              #newpin
              type="password"
              inputmode="numeric"
              maxlength="4"
              placeholder="••••"
              (input)="pinFeedback.set('')"
              class="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-xl tracking-[0.4em] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </label>
          @if (pinFeedback()) {
            <p
              class="mt-2 text-sm font-semibold"
              [class]="pinSaved() ? 'text-primary' : 'text-triage-red'"
            >
              {{ pinFeedback() | translate }}
            </p>
          }
          <button
            type="button"
            (click)="savePin(newpin.value)"
            class="mt-3 w-full rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-dark"
          >
            {{ 'config.pin.save' | translate }}
          </button>
        </section>

        <button
          type="button"
          (click)="lock()"
          class="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-slate-700"
        >
          <i class="ri-lock-line"></i>
          {{ 'config.lock' | translate }}
        </button>
      }
    </main>
  `,
})
export class ConfiguracionPageComponent {
  private readonly settings = inject(SettingsService);
  private readonly translate = inject(TranslateService);
  private readonly location = inject(Location);

  readonly unlocked = this.settings.unlocked;
  readonly volume = this.settings.voiceVolume;
  readonly textSize = this.settings.textSize;

  readonly pinError = signal(false);
  readonly pinFeedback = signal('');
  readonly pinSaved = signal(false);

  readonly textSizes: { value: TextSize; labelKey: string }[] = [
    { value: 'normal', labelKey: 'config.text.normal' },
    { value: 'large', labelKey: 'config.text.large' },
    { value: 'xlarge', labelKey: 'config.text.xlarge' },
  ];

  onUnlock(pin: string): void {
    if (!this.settings.unlock(pin)) {
      this.pinError.set(true);
    }
  }

  onVolume(value: string): void {
    this.settings.setVoiceVolume(Number(value));
  }

  setText(size: TextSize): void {
    this.settings.setTextSize(size);
  }

  testVoice(): void {
    this.settings.testVoice(this.translate.instant('config.voice.sample'));
  }

  savePin(pin: string): void {
    if (!/^\d{4}$/.test(pin)) {
      this.pinSaved.set(false);
      this.pinFeedback.set('config.pin.invalid');
      return;
    }
    this.settings.changePin(pin);
    this.pinSaved.set(true);
    this.pinFeedback.set('config.pin.saved');
  }

  lock(): void {
    this.settings.lock();
  }

  goBack(): void {
    this.location.back();
  }
}
