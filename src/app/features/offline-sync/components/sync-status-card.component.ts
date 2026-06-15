import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/** Card central de P5: número grande de pendientes y su estado. */
@Component({
  selector: 'app-sync-status-card',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl bg-white p-6 text-center shadow-card">
      <span
        class="mx-auto flex h-16 w-16 items-center justify-center rounded-full"
        [class]="hasPending() ? 'bg-amber-100 text-offline' : 'bg-emerald-100 text-primary'"
      >
        <i
          class="text-3xl"
          [class]="hasPending() ? 'ri-database-2-line' : 'ri-checkbox-circle-line'"
        ></i>
      </span>

      <p class="mt-3 text-4xl font-extrabold text-slate-800">{{ pendingCount() }}</p>

      @if (hasPending()) {
        <p class="mt-1 font-bold text-slate-700">{{ 'offline.status.pendingLabel' | translate }}</p>
        <p class="mx-auto mt-1 max-w-xs text-sm text-slate-500">
          {{ 'offline.status.pendingHint' | translate }}
        </p>
      } @else {
        <p class="mt-1 font-bold text-slate-700">
          {{ 'offline.status.allSyncedTitle' | translate }}
        </p>
        <p class="mt-1 text-sm text-slate-500">{{ 'offline.status.allSyncedHint' | translate }}</p>
      }
    </div>
  `,
})
export class SyncStatusCardComponent {
  readonly pendingCount = input.required<number>();
  protected readonly hasPending = computed(() => this.pendingCount() > 0);
}
