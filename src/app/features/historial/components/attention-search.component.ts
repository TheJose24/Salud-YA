import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/** Campo de búsqueda de atenciones por nombre de paciente. */
@Component({
  selector: 'app-attention-search',
  standalone: true,
  imports: [TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <i class="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
      <input
        #input
        type="search"
        [value]="value()"
        (input)="search.emit(input.value)"
        [placeholder]="'historial.searchPlaceholder' | translate"
        class="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-slate-800 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
      />
    </div>
  `,
})
export class AttentionSearchComponent {
  readonly value = input('');
  readonly search = output<string>();
}
