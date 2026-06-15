import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { SyncService } from '../../core/services/sync.service';
import { HeaderComponent } from '../../shared/components/app-header/app-header.component';
import { LanguageButtonComponent } from '../../shared/components/language-button/language-button.component';
import { OfflineBannerComponent } from '../../shared/components/offline-banner/offline-banner.component';
import { PostaContextCardComponent } from '../../shared/components/posta-context-card/posta-context-card.component';
import { ButtonComponent } from '../../shared/components/ui-button/ui-button.component';
import { OfflineInfoCardComponent } from './components/offline-info-card.component';
import { SyncStatusCardComponent } from './components/sync-status-card.component';
import { UnsyncedListComponent } from './components/unsynced-list.component';

/** P5 — Estado Offline / Cola de Sincronización (container). */
@Component({
  selector: 'app-offline-sync-page',
  standalone: true,
  imports: [
    TranslateModule,
    HeaderComponent,
    LanguageButtonComponent,
    OfflineBannerComponent,
    PostaContextCardComponent,
    ButtonComponent,
    SyncStatusCardComponent,
    UnsyncedListComponent,
    OfflineInfoCardComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header titleKey="offline.title" [showBack]="true" (back)="goBack()">
      <app-language-button actions />
    </app-header>

    @if (!online()) {
      <app-offline-banner [pendingCount]="pendingCount()" (sync)="onSync()" />
    }

    <main class="mx-auto w-full max-w-2xl animate-fade-in space-y-4 p-4 sm:p-6">
      <app-posta-context-card variant="operator" />
      <app-sync-status-card [pendingCount]="pendingCount()" />

      @if (pendingCount() > 0) {
        <app-unsynced-list [attentions]="pending()" />
        <app-button [full]="true" icon="ri-refresh-line" [loading]="syncing()" (clicked)="onSync()">
          {{ (syncing() ? 'offline.syncing' : 'offline.syncNow') | translate }}
        </app-button>
      }

      <app-offline-info-card />
    </main>
  `,
})
export class OfflineSyncPageComponent {
  private readonly sync = inject(SyncService);
  private readonly location = inject(Location);

  readonly online = this.sync.online;
  readonly syncing = this.sync.syncing;
  readonly pending = this.sync.pendingAttentions;
  readonly pendingCount = this.sync.pendingCount;

  onSync(): void {
    void this.sync.sincronizar();
  }

  goBack(): void {
    this.location.back();
  }
}
