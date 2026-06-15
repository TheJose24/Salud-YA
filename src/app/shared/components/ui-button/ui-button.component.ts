import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/** Botón del sistema con variantes, ícono y estado de carga. */
@Component({
  selector: 'app-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type()"
      [disabled]="disabled() || loading()"
      [class]="classes()"
      (click)="clicked.emit()"
    >
      @if (loading()) {
        <i class="ri-loader-4-line animate-spin text-lg"></i>
      } @else if (icon()) {
        <i [class]="icon()" class="text-lg"></i>
      }
      <ng-content />
    </button>
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly type = input<'button' | 'submit'>('button');
  readonly icon = input<string>();
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly full = input(false);
  readonly clicked = output<void>();

  private readonly base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-base font-bold transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100';

  protected readonly classes = computed(() => {
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-primary text-white hover:bg-primary-dark',
      secondary: 'bg-primary-light text-primary hover:bg-emerald-100',
      ghost: 'bg-transparent text-slate-600 hover:bg-slate-100',
    };
    return `${this.base} ${variants[this.variant()]} ${this.full() ? 'w-full' : ''}`;
  });
}
