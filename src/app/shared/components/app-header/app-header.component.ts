import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/** Cabecera: botón volver opcional, título centrado y slot de acciones (`actions`). */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="pt-safe sticky top-0 z-20 flex items-center gap-2 border-b border-slate-100 bg-white/95 px-4 pb-3 backdrop-blur sm:px-6"
    >
      <div class="flex shrink-0 items-center">
        @if (showBack()) {
          <button
            type="button"
            class="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200 active:scale-95"
            [attr.aria-label]="'common.back' | translate"
            (click)="back.emit()"
          >
            <i class="ri-arrow-left-line text-xl"></i>
          </button>
        }
      </div>

      <h1 class="min-w-0 flex-1 truncate text-center text-lg font-extrabold text-slate-800">
        {{ titleKey() | translate }}
      </h1>

      <div class="flex shrink-0 items-center gap-2">
        <ng-content select="[actions]" />
      </div>
    </header>
  `,
})
export class HeaderComponent {
  readonly titleKey = input.required<string>();
  readonly showBack = input(false);
  readonly back = output<void>();
}
