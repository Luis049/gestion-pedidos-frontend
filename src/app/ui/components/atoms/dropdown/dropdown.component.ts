import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherChevronDown, featherPrinter } from '@ng-icons/feather-icons';
import { NgpButton } from 'ng-primitives/button';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

interface Item {
  label: string;
  value: string;
}

@Component({
  selector: 'sd-dropdown',
  standalone: true,
  imports: [NgpButton, NgpMenu, NgpMenuTrigger, NgpMenuItem, NgIcon],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  viewProviders: [provideIcons({ featherChevronDown, featherPrinter })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements AfterViewInit {
  @Input() iconPrinter = false;
  ngAfterViewInit(): void {
    this.loadColors();
  }

  @Input({ required: true }) itemSelected = '';
  @Input() idUnique: string = '';

  listColors = ['#f97316', '#0ea5e9', '#a855f7', '#45a268'];
  @Input() listaItems: Item[] = [];
  @Output() itemSelectedChange = new EventEmitter<string>();

  get getItemSelected() {
    return this.listaItems.find((item) => item.value === this.itemSelected)
      ?.label;
  }

  onItemSelected(item: Item) {
    this.itemSelectedChange.emit(item.value);
    this.loadColors();
  }

  loadColors() {
    const indexButtonSelected = this.listaItems.findIndex(
      (item) => item.value === this.itemSelected
    );
    const element = document.querySelector(
      `.dropdown-${this.idUnique}`
    ) as HTMLElement;
    console.log(element);
    if (indexButtonSelected !== -1) {
      element.style.backgroundColor = this.listColors[indexButtonSelected];
    }
  }
}
