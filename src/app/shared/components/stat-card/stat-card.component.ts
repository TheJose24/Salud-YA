import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

type StatTone = 'red' | 'yellow' | 'green';

// Clases literales para que Tailwind las detecte.
const TONE_CLASS: Record<StatTone, string> = {
  red: 'bg-red-50 border-red-100 text-red-600',
  yellow: 'bg-amber-50 border-amber-100 text-amber-600',
  green: 'bg-emerald-50 border-emerald-100 text-emerald-600',
};

/** Tarjeta contadora (número grande + etiqueta) usada en el resumen de triaje. */
@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl border px-2 py-4 text-center sm:px-3" [class]="toneClass()">
      <p class="text-2xl font-extrabold leading-none sm:text-3xl">{{ count() }}</p>
      <p class="mt-1 text-[11px] font-semibold leading-tight sm:text-xs">
        {{ labelKey() | translate }}
      </p>
    </div>
  `,
})
export class StatCardComponent {
  readonly count = input.required<number>();
  readonly labelKey = input.required<string>();
  readonly tone = input.required<StatTone>();

  protected readonly toneClass = computed(() => TONE_CLASS[this.tone()]);
}
