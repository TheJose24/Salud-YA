import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StatCardComponent } from '../../../shared/components/stat-card/stat-card.component';

/** Resumen de atenciones por nivel de triaje (3 contadores). */
@Component({
  selector: 'app-triage-summary',
  standalone: true,
  imports: [StatCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="grid grid-cols-3 gap-3">
      <app-stat-card [count]="urgent()" labelKey="historial.summary.urgent" tone="red" />
      <app-stat-card [count]="scheduled()" labelKey="historial.summary.scheduled" tone="yellow" />
      <app-stat-card [count]="ambulatory()" labelKey="historial.summary.ambulatory" tone="green" />
    </div>
  `,
})
export class TriageSummaryComponent {
  readonly urgent = input.required<number>();
  readonly scheduled = input.required<number>();
  readonly ambulatory = input.required<number>();
}
