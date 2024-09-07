import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgpButton } from 'ng-primitives/button';
import { NgpMenu, NgpMenuItem, NgpMenuTrigger } from 'ng-primitives/menu';

interface Item {
  label: string;
  value: number;
  selected: boolean;
}

@Component({
  selector: 'sd-dropdown',
  standalone: true,
  imports: [
    NgpButton,
    NgpMenu,
    NgpMenuTrigger,
    NgpMenuItem,
  ],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
  @Input() listaItems: Item[] = [
    {
      label: 'Item 1',
      value: 1,
      selected: false,
    },
  ];

  get getItemSelected() {
    return this.listaItems.find(item => item.selected)?.label;
  }

  onItemSelected(item: Item) {
    this.listaItems = this.listaItems.map(itemCurrent => {
      if (itemCurrent.value === item.value) {
        return { ...itemCurrent, selected: true };
      }else{
        return { ...itemCurrent, selected: false };
      }
    });
  }
}
