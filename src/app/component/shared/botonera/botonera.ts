import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';

@Component({
  selector: 'app-botonera',
  template: `
    <nav class="botonera">
      <button 
        *ngFor="let page of pages()"
        [class.active]="page === currentPage + 1"
        [disabled]="page === '...'"
        (click)="onPageClick(page)"
        type="button"
      >
        {{ page }}
      </button>
    </nav>
  `,
  styleUrl: './botonera.css',
})
export class BotoneraComponent {
  @Input() currentPage = 0; // 0-based
  @Input() totalPages = 1;
  @Input() neighborhood = 1;
  @Output() pageChange = new EventEmitter<number>();

  pages = computed(() => {
    const numPag = this.currentPage;
    const numPages = this.totalPages;
    const neighborhood = this.neighborhood;
    let botonera: (string|number)[] = [];
    let paginaActual = numPag + 1;
    for (let i = 1; i <= numPages; i++) {
      if (i == 1) {
        botonera.push(1);
      } else if (i == paginaActual) {
        botonera.push(i);
      } else if (i == numPages) {
        botonera.push(i);
      } else if (i >= paginaActual - neighborhood && i < paginaActual) {
        botonera.push(i);
      } else if (i <= paginaActual + neighborhood && i > paginaActual) {
        botonera.push(i);
      } else if (i == paginaActual - neighborhood - 1) {
        botonera.push('...');
      } else if (i == paginaActual + neighborhood + 1) {
        botonera.push('...');
      }
    }
    return botonera;
  });

  onPageClick(page: string|number) {
    if (typeof page === 'number') {
      this.pageChange.emit(page - 1); // Emitimos 0-based
    }
  }
}
