import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PostaSessionService } from '../../../core/services/posta-session.service';

/** Posta y operador de la sesión; `variant` elige código u operador. */
@Component({
  selector: 'app-posta-context-card',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex items-center gap-3 rounded-2xl bg-primary-light px-4 py-3">
      <span
        class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-primary"
      >
        <i class="ri-hospital-line text-xl"></i>
      </span>
      <div class="min-w-0">
        <p class="truncate font-bold text-slate-800">{{ posta().name }}</p>
        <p class="truncate text-sm text-slate-500">
          @if (variant() === 'operator') {
            {{ 'posta.operatorLabel' | translate }}: {{ posta().operator }}
          } @else {
            {{ 'posta.codeLabel' | translate }}: {{ posta().code }}
          }
        </p>
      </div>
    </div>
  `,
})
export class PostaContextCardComponent {
  private readonly session = inject(PostaSessionService);
  readonly posta = this.session.posta;
  readonly variant = input<'code' | 'operator'>('code');
}
