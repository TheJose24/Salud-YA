import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Attention } from '../../../core/models/attention.model';
import { SyncStatus } from '../../../core/models/sync-status.enum';
import { TriageBadgeComponent } from '../../../shared/components/triage-badge/triage-badge.component';
import { SaludDateTimePipe } from '../../../shared/pipes/datetime.pipe';

/** Tarjeta de una atención dentro del historial. */
@Component({
  selector: 'app-attention-list-item',
  standalone: true,
  imports: [TranslateModule, TriageBadgeComponent, SaludDateTimePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <article class="rounded-2xl bg-white p-4 shadow-card transition hover:shadow-md">
      <div class="flex items-start justify-between gap-3">
        <div class="flex min-w-0 items-start gap-2.5">
          <span class="mt-1.5 flex shrink-0">
            <app-triage-badge [level]="attention().triageLevel" display="dot" />
          </span>
          <div class="min-w-0">
            <h3 class="font-bold text-slate-800">{{ attention().patient.fullName }}</h3>
            <p class="text-sm text-slate-500">{{ attention().createdAt | saludDateTime }}</p>
          </div>
        </div>
        <app-triage-badge [level]="attention().triageLevel" />
      </div>

      <p class="mt-2 text-sm leading-relaxed text-slate-600">{{ attention().recommendation }}</p>

      @if (attention().syncStatus === SyncStatus.Pending) {
        <p class="mt-2 flex items-center gap-1.5 text-sm font-semibold text-offline">
          <i class="ri-time-line"></i>
          {{ 'historial.pendingSync' | translate }}
        </p>
      }
    </article>
  `,
})
export class AttentionListItemComponent {
  readonly attention = input.required<Attention>();
  protected readonly SyncStatus = SyncStatus;
}
