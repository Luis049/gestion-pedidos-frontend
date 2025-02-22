// table.component.ts
import {
  AfterContentInit,
  Component,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces
export interface TableColumn<T> {
  header: string;
  field: keyof T;
  sortable?: boolean;
  width?: string;
  customTemplate?: boolean;
  format?: (value: any) => string;
  align?: 'left' | 'center' | 'right';
}

export interface TableAction {
  label: string;
  icon?: string;
  action: string;
  color?: string;
  showIf?: (item: any) => boolean;
}

export interface TableConfig<T> {
  columns: TableColumn<T>[];
  actions?: TableAction[];
  pageSize?: number;
  showSearch?: boolean;
  showPagination?: boolean;
  sortable?: boolean;
  customClass?: string;
}

export interface TableActionEvent<T> {
  action: string;
  item: T;
}

@Directive({
  selector: '[sdCustomColumn]', // Cambiamos el selector para que sea más específico
  standalone: true,
})
export class CustomColumnDirective {
  @Input('sdCustomColumn') columnName!: string;

  constructor(public template: TemplateRef<any>) {
    console.log('CustomColumnDirective constructor');
  }

  ngOnInit() {
    console.log('CustomColumnDirective init:', this.columnName);
  }
}

@Component({
  selector: 'sd-table',
  standalone: true,
  imports: [CommonModule, FormsModule, CustomColumnDirective],
  templateUrl: './sd-table.component.html',
})
export class SdTableComponent<T> implements OnInit, AfterContentInit {
  @Input() data = signal<T[]>([]);
  config = input.required<TableConfig<T>>();
  actionClick = output<TableActionEvent<T>>();

  @ContentChildren(CustomColumnDirective)
  customTemplates!: QueryList<CustomColumnDirective>;

  // Pagination
  currentPage = 1;
  pageSize = 10;

  // Sorting
  sortColumn?: keyof T;
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filtered and paginated data
  filteredData = signal<T[]>([]);
  paginatedData = signal<T[]>([]);

  private templateMap = new Map<string, TemplateRef<any>>();

  constructor() {
    effect(() => this.applyFilters(), { allowSignalWrites: true });
  }

  ngOnInit() {
    this.pageSize = this.config().pageSize || 10;
    this.applyFilters();
  }

  ngAfterContentInit() {
    this.registerCustomTemplates();

    this.customTemplates?.changes.subscribe(() => {
      this.registerCustomTemplates();
    });
  }

  private registerCustomTemplates() {
    this.templateMap.clear();
    this.customTemplates?.forEach((item) => {
      this.templateMap.set(item.columnName, item.template);
    });
  }

  getCustomTemplate(field: keyof T): TemplateRef<any> | null {
    const template = this.templateMap.get(field as string);
    return template || null;
  }

  onSearch(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onSort(column: TableColumn<T>): void {
    if (!column.sortable) return;

    if (this.sortColumn === column.field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column.field;
      this.sortDirection = 'asc';
    }

    this.applyFilters();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.applyFilters();
  }

  onPageSizeChange(): void {
    this.currentPage = 1;
    this.applyFilters();
  }

  onActionClick(action: string, item: T): void {
    this.actionClick.emit({ action, item });
  }

  private applyFilters(): void {
    console.log('applyFilters');
    let filtered = [...this.data()];
    // Apply sort
    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aValue = a[this.sortColumn!];
        const bValue = b[this.sortColumn!];
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    this.filteredData.set(filtered);
    this.updatePaginatedData();
  }

  private updatePaginatedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData.set(this.filteredData().slice(start, end));
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }
}
