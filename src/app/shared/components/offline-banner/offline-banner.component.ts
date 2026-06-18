import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/** Banner de alerta de "sin conexión" con la acción de sincronizar. */
@Component({
  selector: 'app-offline-banner',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center justify-between gap-3 bg-offline px-4 py-3 text-white sm:px-6">
      <div class="flex min-w-0 items-center gap-3">
        <i class="ri-wifi-off-line shrink-0 text-2xl"></i>
        <div class="min-w-0 leading-tight">
          <p class="truncate font-bold">{{ 'offline.banner.offline' | translate }}</p>
          <p class="truncate text-xs text-white/90 sm:text-sm">
            {{ 'offline.banner.pending' | translate: { count: pendingCount() } }}
          </p>
        </div>
      </div>
      <button
        type="button"
        class="shrink-0 rounded-lg bg-white px-3 py-2 text-sm font-bold text-offline transition hover:bg-white/90 active:scale-95 disabled:opacity-60 sm:px-4"
        [disabled]="pendingCount() === 0"
        (click)="sync.emit()"
      >
        {{ 'offline.banner.sync' | translate }}
      </button>
    </div>
  `,
})
export class OfflineBannerComponent {
  readonly pendingCount = input.required<number>();
  readonly sync = output<void>();
}
