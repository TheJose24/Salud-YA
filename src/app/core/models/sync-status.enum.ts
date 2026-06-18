/** Estado de sincronización de una atención con el servidor. */
export enum SyncStatus {
  /** Ya sincronizada con el servidor. */
  Synced = 'SYNCED',
  /** Pendiente: guardada localmente, esperando conexión. */
  Pending = 'PENDING',
}
