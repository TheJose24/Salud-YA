import { computed, Injectable, signal } from '@angular/core';
import { MOCK_ATTENTIONS } from '../data/mock-attentions';
import { Attention } from '../models/attention.model';
import { SyncStatus } from '../models/sync-status.enum';
import { TriageLevel } from '../models/triage-level.enum';

/** Store de atenciones: única fuente de verdad (Signals). */
@Injectable({ providedIn: 'root' })
export class AttentionStoreService {
  private readonly _attentions = signal<Attention[]>(MOCK_ATTENTIONS);
  private readonly _searchTerm = signal('');

  readonly searchTerm = this._searchTerm.asReadonly();

  /** Atenciones, de la más reciente a la más antigua. */
  readonly attentions = computed(() =>
    [...this._attentions()].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  );

  /** Atenciones filtradas por nombre del paciente. */
  readonly filteredAttentions = computed(() => {
    const term = this._searchTerm().trim().toLowerCase();
    const list = this.attentions();
    return term ? list.filter(a => a.patient.fullName.toLowerCase().includes(term)) : list;
  });

  readonly urgentCount = computed(() => this.countByLevel(TriageLevel.Red));
  readonly scheduledCount = computed(() => this.countByLevel(TriageLevel.Yellow));
  readonly ambulatoryCount = computed(() => this.countByLevel(TriageLevel.Green));

  /** Atenciones pendientes de sincronizar. */
  readonly pendingAttentions = computed(() =>
    this.attentions().filter(a => a.syncStatus === SyncStatus.Pending)
  );

  setSearchTerm(term: string): void {
    this._searchTerm.set(term);
  }

  /** Marca como sincronizadas las atenciones en cola. */
  markAllSynced(): void {
    this._attentions.update(list =>
      list.map(a =>
        a.syncStatus === SyncStatus.Pending ? { ...a, syncStatus: SyncStatus.Synced } : a
      )
    );
  }

  private countByLevel(level: TriageLevel): number {
    return this._attentions().filter(a => a.triageLevel === level).length;
  }
}
