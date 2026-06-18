import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Tarjeta blanca con borde redondeado y sombra suave del sistema. */
@Component({
  selector: 'app-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rounded-2xl bg-white shadow-card" [class.p-4]="padded()">
      <ng-content />
    </div>
  `,
})
export class CardComponent {
  readonly padded = input(true);
}
