import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/** Gate de acceso a la configuración: pide el PIN de administrador. */
@Component({
  selector: 'app-pin-gate',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="mx-auto max-w-sm">
      <div class="rounded-2xl bg-white p-6 shadow-card">
        <span
          class="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary-light text-primary"
        >
          <i class="ri-lock-2-line text-2xl"></i>
        </span>
        <h2 class="mt-3 text-center text-lg font-extrabold text-slate-800">
          {{ 'config.locked.title' | translate }}
        </h2>
        <p class="mt-1 text-center text-sm text-slate-500">
          {{ 'config.locked.subtitle' | translate }}
        </p>

        <label class="mt-5 block">
          <span class="text-sm font-bold text-slate-700">
            {{ 'config.locked.pinLabel' | translate }}
          </span>
          <input
            #pin
            type="password"
            inputmode="numeric"
            maxlength="4"
            placeholder="••••"
            (input)="changed.emit()"
            (keyup.enter)="submitted.emit(pin.value)"
            class="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-2xl tracking-[0.5em] focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </label>

        @if (error()) {
          <p class="mt-2 text-sm font-semibold text-triage-red">
            {{ 'config.locked.error' | translate }}
          </p>
        }

        <button
          type="button"
          (click)="submitted.emit(pin.value)"
          class="mt-4 w-full rounded-xl bg-primary px-5 py-3 font-bold text-white transition hover:bg-primary-dark active:scale-[0.98]"
        >
          {{ 'config.locked.unlock' | translate }}
        </button>
      </div>
    </div>
  `,
})
export class PinGateComponent {
  readonly error = input(false);
  readonly submitted = output<string>();
  readonly changed = output<void>();
}
