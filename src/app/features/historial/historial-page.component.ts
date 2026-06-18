import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { AttentionStoreService } from '../../core/services/attention-store.service';
import { HeaderComponent } from '../../shared/components/app-header/app-header.component';
import { LanguageButtonComponent } from '../../shared/components/language-button/language-button.component';
import { PostaContextCardComponent } from '../../shared/components/posta-context-card/posta-context-card.component';
import { AttentionSearchComponent } from './components/attention-search.component';
import { AttentionListItemComponent } from './components/attention-list-item.component';
import { TriageSummaryComponent } from './components/triage-summary.component';

/** P4 — Historial de Atenciones (container). */
@Component({
  selector: 'app-historial-page',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule,
    HeaderComponent,
    LanguageButtonComponent,
    PostaContextCardComponent,
    AttentionSearchComponent,
    TriageSummaryComponent,
    AttentionListItemComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header titleKey="historial.title" [showBack]="true" (back)="goBack()">
      <div actions class="flex items-center gap-2">
        <a
          routerLink="/offline"
          class="relative flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          [attr.aria-label]="'offline.title' | translate"
        >
          <i class="ri-refresh-line text-lg"></i>
          @if (pendingCount() > 0) {
            <span
              class="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-triage-red px-1 text-xs font-bold text-white"
            >
              {{ pendingCount() }}
            </span>
          }
        </a>
        <app-language-button />
      </div>
    </app-header>

    <main class="mx-auto w-full max-w-2xl animate-fade-in space-y-4 p-4 sm:p-6">
      <app-posta-context-card variant="code" />
      <app-attention-search [value]="searchTerm()" (search)="onSearch($event)" />
      <app-triage-summary
        [urgent]="urgentCount()"
        [scheduled]="scheduledCount()"
        [ambulatory]="ambulatoryCount()"
      />

      <section class="space-y-3">
        @for (attention of attentions(); track attention.id) {
          <app-attention-list-item [attention]="attention" />
        } @empty {
          <p class="py-10 text-center text-slate-400">{{ 'historial.empty' | translate }}</p>
        }
      </section>
    </main>

    <!-- FAB: en la app completa abriría el registro de paciente (P1, fuera de alcance). -->
    <button
      type="button"
      class="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary-dark active:scale-95 sm:right-6"
      [attr.aria-label]="'historial.newAttention' | translate"
    >
      <i class="ri-add-line text-2xl"></i>
    </button>
  `,
})
export class HistorialPageComponent {
  private readonly store = inject(AttentionStoreService);
  private readonly location = inject(Location);

  readonly attentions = this.store.filteredAttentions;
  readonly searchTerm = this.store.searchTerm;
  readonly urgentCount = this.store.urgentCount;
  readonly scheduledCount = this.store.scheduledCount;
  readonly ambulatoryCount = this.store.ambulatoryCount;
  readonly pendingCount = computed(() => this.store.pendingAttentions().length);

  onSearch(term: string): void {
    this.store.setSearchTerm(term);
  }

  goBack(): void {
    this.location.back();
  }
}
