
// table.component.ts
import { AfterContentInit, Component, ContentChildren, Directive, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, input, output } from '@angular/core';
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
  standalone: true
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
  templateUrl: './sd-table.component.html'
})
export class SdTableComponent<T> implements OnInit, AfterContentInit {
  data = input<T[]>([]);
  config = input.required<TableConfig<T>>();
  actionClick = output<TableActionEvent<T>>();

  @ContentChildren(CustomColumnDirective)
  customTemplates!: QueryList<CustomColumnDirective>;


  // Pagination
  currentPage = 1;
  pageSize = 10;
  searchTerm = '';

  // Sorting
  sortColumn?: keyof T;
  sortDirection: 'asc' | 'desc' = 'asc';

  // Filtered and paginated data
  filteredData: T[] = [];
  paginatedData: T[] = [];

  private templateMap = new Map<string, TemplateRef<any>>();

  ngOnInit() {
    console.log('Table Component Init');
    console.log('Config:', this.config());
    this.pageSize = this.config().pageSize || 10;
    this.applyFilters();
  }

  ngAfterContentInit() {
    console.log('After Content Init - Templates:', this.customTemplates?.length);
    this.registerCustomTemplates();

    this.customTemplates?.changes.subscribe(() => {
      console.log('Templates Changed');
      this.registerCustomTemplates();
    });
  }

  private registerCustomTemplates() {
    this.templateMap.clear();
    console.log('Registering templates...');
    this.customTemplates?.forEach(item => {
      console.log('Found template for column:', item.columnName);
      this.templateMap.set(item.columnName, item.template);
    });
  }

  getCustomTemplate(field: keyof T): TemplateRef<any> | null {
    const template = this.templateMap.get(field as string);
    console.log(`Getting template for ${field as string}:`, template ? 'found' : 'not found');
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
    let filtered = [...this.data()];

    // Apply search
    if (this.searchTerm) {
      const searchLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter((item: any) =>
        Object.values(item).some(value =>
          String(value).toLowerCase().includes(searchLower)
        )
      );
    }

    // Apply sort
    if (this.sortColumn) {
      filtered.sort((a, b) => {
        const aValue = a[this.sortColumn!];
        const bValue = b[this.sortColumn!];
        const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
        return this.sortDirection === 'asc' ? comparison : -comparison;
      });
    }

    this.filteredData = filtered;
    this.updatePaginatedData();
  }

  private updatePaginatedData(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedData = this.filteredData.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.pageSize);
  }
}
