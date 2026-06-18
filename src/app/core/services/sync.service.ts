import { computed, inject, Injectable, signal } from '@angular/core';
import { AttentionStoreService } from './attention-store.service';

/** Estado de conexión y cola de sincronización (P5). */
@Injectable({ providedIn: 'root' })
export class SyncService {
  private readonly store = inject(AttentionStoreService);

  // Arranca offline para mostrar la cola.
  private readonly _online = signal(false);
  private readonly _syncing = signal(false);

  readonly online = this._online.asReadonly();
  readonly syncing = this._syncing.asReadonly();

  readonly pendingAttentions = this.store.pendingAttentions;
  readonly pendingCount = computed(() => this.pendingAttentions().length);

  setOnline(value: boolean): void {
    this._online.set(value);
  }

  /** Sincroniza la cola (simula latencia de red). */
  async sincronizar(): Promise<void> {
    if (this._syncing() || this.pendingCount() === 0) {
      return;
    }
    this._syncing.set(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    this.store.markAllSynced();
    this._online.set(true);
    this._syncing.set(false);
  }
}
