import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

/** Tarjeta de acceso rápido del menú principal (navega a una ruta). */
@Component({
  selector: 'app-menu-tile',
  standalone: true,
  imports: [RouterLink, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      [routerLink]="link()"
      class="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-card transition hover:bg-slate-50 active:scale-[0.98]"
    >
      <span
        class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary"
      >
        <i [class]="icon()" class="text-2xl"></i>
      </span>
      <span class="min-w-0 flex-1">
        <span class="block font-bold text-slate-800">{{ titleKey() | translate }}</span>
        <span class="block text-sm text-slate-500">{{ descKey() | translate }}</span>
      </span>
      @if (badge() > 0) {
        <span
          class="flex h-6 min-w-6 items-center justify-center rounded-full bg-triage-red px-1.5 text-xs font-bold text-white"
        >
          {{ badge() }}
        </span>
      }
      <i class="ri-arrow-right-s-line text-2xl text-slate-300"></i>
    </a>
  `,
})
export class MenuTileComponent {
  readonly icon = input.required<string>();
  readonly titleKey = input.required<string>();
  readonly descKey = input.required<string>();
  readonly link = input.required<string>();
  readonly badge = input(0);
}
