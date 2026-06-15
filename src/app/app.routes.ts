import { Routes } from '@angular/router';

/** Rutas con carga diferida (lazy). El menú es la home. */
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  {
    path: 'menu',
    loadComponent: () =>
      import('./features/menu/menu-page.component').then(m => m.MenuPageComponent),
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./features/historial/historial-page.component').then(m => m.HistorialPageComponent),
  },
  {
    path: 'offline',
    loadComponent: () =>
      import('./features/offline-sync/offline-sync-page.component').then(
        m => m.OfflineSyncPageComponent
      ),
  },
  {
    path: 'idioma',
    loadComponent: () =>
      import('./features/language-settings/language-settings-page.component').then(
        m => m.LanguageSettingsPageComponent
      ),
  },
  {
    path: 'configuracion',
    loadComponent: () =>
      import('./features/configuracion/configuracion-page.component').then(
        m => m.ConfiguracionPageComponent
      ),
  },
  { path: '**', redirectTo: 'menu' },
];
