import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/** Card educativa que explica cómo funciona la app sin conexión. */
@Component({
  selector: 'app-offline-info-card',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl bg-white p-4 shadow-card">
      <h2 class="mb-3 flex items-center gap-2 font-bold text-slate-800">
        <i class="ri-information-line text-primary"></i>
        {{ 'offline.info.title' | translate }}
      </h2>
      <ul class="space-y-2">
        @for (key of points; track key) {
          <li class="flex items-start gap-2 text-sm text-slate-600">
            <i class="ri-check-line mt-0.5 text-primary"></i>
            <span>{{ key | translate }}</span>
          </li>
        }
      </ul>
    </div>
  `,
})
export class OfflineInfoCardComponent {
  protected readonly points = ['offline.info.point1', 'offline.info.point2', 'offline.info.point3'];
}
