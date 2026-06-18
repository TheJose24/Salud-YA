import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Attention } from '../../../core/models/attention.model';
import { SaludDateTimePipe } from '../../../shared/pipes/datetime.pipe';

/** Lista numerada de atenciones que esperan sincronización. */
@Component({
  selector: 'app-unsynced-list',
  standalone: true,
  imports: [TranslateModule, SaludDateTimePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl bg-white p-4 shadow-card">
      <h2 class="mb-3 font-bold text-slate-800">{{ 'offline.unsyncedTitle' | translate }}</h2>
      <ul class="space-y-1">
        @for (attention of attentions(); track attention.id; let i = $index) {
          <li class="flex items-center gap-3 rounded-xl px-2 py-2">
            <span
              class="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold text-slate-500"
            >
              {{ i + 1 }}
            </span>
            <div class="min-w-0 flex-1">
              <p class="truncate font-semibold text-slate-800">{{ attention.patient.fullName }}</p>
              <p class="text-sm text-slate-500">{{ attention.createdAt | saludDateTime }}</p>
            </div>
            <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-triage-green"></span>
          </li>
        }
      </ul>
    </div>
  `,
})
export class UnsyncedListComponent {
  readonly attentions = input.required<Attention[]>();
}
