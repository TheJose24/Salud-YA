import { Patient } from './patient.model';
import { SyncStatus } from './sync-status.enum';
import { TriageLevel } from './triage-level.enum';

/** Una atención de triaje registrada en la posta. */
export interface Attention {
  id: string;
  patient: Patient;
  triageLevel: TriageLevel;
  /** Fecha y hora de la atención (ISO 8601). */
  createdAt: string;
  /** Recomendación clínica resultante del triaje. */
  recommendation: string;
  syncStatus: SyncStatus;
}
