import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { AttentionStoreService } from '../../core/services/attention-store.service';
import { PostaSessionService } from '../../core/services/posta-session.service';
import { HeaderComponent } from '../../shared/components/app-header/app-header.component';
import { LanguageButtonComponent } from '../../shared/components/language-button/language-button.component';
import { PostaContextCardComponent } from '../../shared/components/posta-context-card/posta-context-card.component';
import { MenuTileComponent } from './components/menu-tile.component';

/** Menú Principal del Operador (container, home). */
@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [
    TranslateModule,
    HeaderComponent,
    LanguageButtonComponent,
    PostaContextCardComponent,
    MenuTileComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header titleKey="menu.title">
      <app-language-button actions />
    </app-header>

    <main class="mx-auto w-full max-w-2xl animate-fade-in space-y-4 p-4 sm:p-6">
      <app-posta-context-card variant="operator" />

      <p class="px-1 text-lg font-extrabold text-slate-800">
        {{ 'menu.greeting' | translate: { operator: operator() } }}
      </p>

      <!-- Nueva consulta: registro/triaje (P1, fuera de alcance). -->
      <button
        type="button"
        class="flex w-full items-center gap-4 rounded-2xl bg-primary p-5 text-left text-white shadow-card transition hover:bg-primary-dark active:scale-[0.98]"
      >
        <span class="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20">
          <i class="ri-stethoscope-line text-3xl"></i>
        </span>
        <span class="min-w-0 flex-1">
          <span class="block text-lg font-extrabold">{{ 'menu.newConsultation' | translate }}</span>
          <span class="block text-sm text-white/90">
            {{ 'menu.newConsultationDesc' | translate }}
          </span>
        </span>
        <i class="ri-arrow-right-line text-2xl"></i>
      </button>

      <app-menu-tile
        icon="ri-file-list-3-line"
        titleKey="menu.history"
        descKey="menu.historyDesc"
        link="/historial"
      />
      <app-menu-tile
        icon="ri-refresh-line"
        titleKey="menu.sync"
        descKey="menu.syncDesc"
        link="/offline"
        [badge]="pendingCount()"
      />
      <app-menu-tile
        icon="ri-settings-3-line"
        titleKey="menu.settings"
        descKey="menu.settingsDesc"
        link="/configuracion"
      />
    </main>
  `,
})
export class MenuPageComponent {
  private readonly session = inject(PostaSessionService);
  private readonly store = inject(AttentionStoreService);

  readonly operator = computed(() => this.session.posta().operator);
  readonly pendingCount = computed(() => this.store.pendingAttentions().length);
}
