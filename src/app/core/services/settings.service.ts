import { effect, Injectable, signal } from '@angular/core';
import {
  DEFAULT_SETTINGS,
  PostaSettings,
  ROOT_FONT_SIZE,
  SETTINGS_STORAGE_KEY,
  TextSize,
} from '../models/settings.model';

/** Ajustes de la posta: volumen de voz, tamaño de texto y PIN. Persistidos en localStorage. */
@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly _voiceVolume = signal(DEFAULT_SETTINGS.voiceVolume);
  private readonly _textSize = signal<TextSize>(DEFAULT_SETTINGS.textSize);
  private readonly _adminPin = signal(DEFAULT_SETTINGS.adminPin);
  private readonly _unlocked = signal(false);

  readonly voiceVolume = this._voiceVolume.asReadonly();
  readonly textSize = this._textSize.asReadonly();
  readonly unlocked = this._unlocked.asReadonly();

  constructor() {
    this.restore();

    // Tamaño de texto al root: escala toda la app (rem).
    effect(() => {
      document.documentElement.style.fontSize = ROOT_FONT_SIZE[this._textSize()];
    });

    // Persiste ante cualquier cambio.
    effect(() => this.persist());
  }

  setVoiceVolume(value: number): void {
    this._voiceVolume.set(Math.max(0, Math.min(100, value)));
  }

  setTextSize(size: TextSize): void {
    this._textSize.set(size);
  }

  changePin(pin: string): void {
    this._adminPin.set(pin);
  }

  /** Desbloquea si el PIN es correcto; devuelve el resultado. */
  unlock(pin: string): boolean {
    const ok = pin === this._adminPin();
    if (ok) {
      this._unlocked.set(true);
    }
    return ok;
  }

  lock(): void {
    this._unlocked.set(false);
  }

  /** Lee un texto con la Web Speech API al volumen configurado. */
  testVoice(text: string): void {
    if (!('speechSynthesis' in window)) {
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-PE';
    utterance.volume = this._voiceVolume() / 100;
    window.speechSynthesis.speak(utterance);
  }

  private persist(): void {
    const data: PostaSettings = {
      voiceVolume: this._voiceVolume(),
      textSize: this._textSize(),
      adminPin: this._adminPin(),
    };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(data));
  }

  private restore(): void {
    const raw = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (!raw) {
      return;
    }
    try {
      const data = JSON.parse(raw) as Partial<PostaSettings>;
      if (typeof data.voiceVolume === 'number') {
        this._voiceVolume.set(data.voiceVolume);
      }
      if (data.textSize) {
        this._textSize.set(data.textSize);
      }
      if (typeof data.adminPin === 'string') {
        this._adminPin.set(data.adminPin);
      }
    } catch {
      // localStorage corrupto: usa los valores por defecto.
    }
  }
}
