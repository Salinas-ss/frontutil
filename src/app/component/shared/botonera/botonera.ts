import { Component, input, output} from '@angular/core';

@Component({
  selector: 'app-botonera',
  imports: [],
  templateUrl: './botonera.html',
  styleUrl: './botonera.css',
})
export class BotoneraComponent {
  buttons = input.required<string[]>();
  currentPage = input.required<number>();
  totalPages = input.required<number>();

  pageChange = output<number>();

  protected readonly Number = Number;

  onPageChange(page: number): void {
    if (page >= 0 && page < this.totalPages()) {
      this.pageChange.emit(page);
    }
  }
}
