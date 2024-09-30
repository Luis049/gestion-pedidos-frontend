import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NgpSelect } from 'ng-primitives/select';

interface IItem {
  label: string;
  value: string;
}

@Component({
  selector: 'sd-select',
  standalone: true,
  imports: [NgpSelect],
  templateUrl: './sd-select.component.html',
  styleUrl: './sd-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdSelectComponent {
  @Input() itemSelected = '';
  @Input() items: IItem[] = [];

  @Output() itemSelectedChange = new EventEmitter<string>();

  onChange(event: Event) {
    this.itemSelected = (event.target as HTMLSelectElement).value;
    this.itemSelectedChange.emit(this.itemSelected);
  }
}
