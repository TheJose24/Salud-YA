import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TriageLevel } from '../../../core/models/triage-level.enum';

// Clases literales para que Tailwind las detecte.
const DOT_CLASS: Record<TriageLevel, string> = {
  [TriageLevel.Red]: 'bg-triage-red',
  [TriageLevel.Yellow]: 'bg-triage-yellow',
  [TriageLevel.Green]: 'bg-triage-green',
};

const BADGE_CLASS: Record<TriageLevel, string> = {
  [TriageLevel.Red]: 'bg-red-100 text-red-700',
  [TriageLevel.Yellow]: 'bg-amber-100 text-amber-700',
  [TriageLevel.Green]: 'bg-emerald-100 text-emerald-700',
};

const LABEL_KEY: Record<TriageLevel, string> = {
  [TriageLevel.Red]: 'triage.red',
  [TriageLevel.Yellow]: 'triage.yellow',
  [TriageLevel.Green]: 'triage.green',
};

/** Indicador de nivel de triaje: como pastilla con texto (`badge`) o punto (`dot`). */
@Component({
  selector: 'app-triage-badge',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (display() === 'dot') {
      <span class="inline-block h-3 w-3 rounded-full" [class]="dotClass()"></span>
    } @else {
      <span
        class="inline-block rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wide"
        [class]="badgeClass()"
      >
        {{ labelKey() | translate }}
      </span>
    }
  `,
})
export class TriageBadgeComponent {
  readonly level = input.required<TriageLevel>();
  readonly display = input<'badge' | 'dot'>('badge');

  protected readonly dotClass = computed(() => {
    const base = DOT_CLASS[this.level()];
    // El rojo (urgente) late para llamar la atención.
    return this.level() === TriageLevel.Red ? `${base} animate-pulse` : base;
  });
  protected readonly badgeClass = computed(() => BADGE_CLASS[this.level()]);
  protected readonly labelKey = computed(() => LABEL_KEY[this.level()]);
}
