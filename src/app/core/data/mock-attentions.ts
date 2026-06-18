import { Attention } from '../models/attention.model';
import { SyncStatus } from '../models/sync-status.enum';
import { TriageLevel } from '../models/triage-level.enum';

/** Datos de ejemplo: 2 por nivel de triaje; las 2 verdes quedan pendientes (cola offline). */
export const MOCK_ATTENTIONS: Attention[] = [
  {
    id: 'att-001',
    patient: { fullName: 'Julio Ccaccasaca Flores', dni: '45123456', age: 34, sex: 'M' },
    triageLevel: TriageLevel.Green,
    createdAt: '2026-05-09T10:15:00',
    recommendation:
      'Seguimiento ambulatorio. Dar consejería de salud y programar revisión en 7 días. No requiere derivación inmediata.',
    syncStatus: SyncStatus.Pending,
  },
  {
    id: 'att-002',
    patient: { fullName: 'Rosa Huamán Quispe', dni: '41785236', age: 58, sex: 'F' },
    triageLevel: TriageLevel.Red,
    createdAt: '2026-05-09T09:30:00',
    recommendation:
      'DERIVACIÓN URGENTE AL HOSPITAL DE REFERENCIA. El paciente presenta signos críticos. Activar ambulancia o transporte de emergencia inmediatamente.',
    syncStatus: SyncStatus.Synced,
  },
  {
    id: 'att-003',
    patient: { fullName: 'Pedro Mamani Quispe', dni: '47896541', age: 45, sex: 'M' },
    triageLevel: TriageLevel.Yellow,
    createdAt: '2026-05-09T08:45:00',
    recommendation:
      'Monitorear signos vitales cada 4 horas. Derivación programada al hospital más cercano en las próximas 24 horas si persisten los síntomas.',
    syncStatus: SyncStatus.Synced,
  },
  {
    id: 'att-004',
    patient: { fullName: 'Luis Quispe Mamani', dni: '44521789', age: 27, sex: 'M' },
    triageLevel: TriageLevel.Green,
    createdAt: '2026-05-08T17:00:00',
    recommendation:
      'Control de presión arterial estable. Continuar tratamiento indicado y reforzar hábitos saludables.',
    syncStatus: SyncStatus.Pending,
  },
  {
    id: 'att-005',
    patient: { fullName: 'María Condori Apaza', dni: '42369874', age: 63, sex: 'F' },
    triageLevel: TriageLevel.Red,
    createdAt: '2026-05-08T15:20:00',
    recommendation:
      'DERIVACIÓN URGENTE. Dificultad respiratoria severa. Coordinar traslado inmediato al hospital de referencia.',
    syncStatus: SyncStatus.Synced,
  },
  {
    id: 'att-006',
    patient: { fullName: 'José Mamani Huanca', dni: '46985213', age: 39, sex: 'M' },
    triageLevel: TriageLevel.Yellow,
    createdAt: '2026-05-08T11:10:00',
    recommendation:
      'Monitorear evolución. Reevaluar en 12 horas; derivar si aparecen signos de alarma.',
    syncStatus: SyncStatus.Synced,
  },
];
