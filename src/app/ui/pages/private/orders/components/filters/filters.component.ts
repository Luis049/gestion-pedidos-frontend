import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SdSearchFieldComponent } from '../../../../../components/atoms/sd-search-field/sd-search-field.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { jamFilter } from '@ng-icons/jam-icons';
import { tablerUTurnLeft } from "@ng-icons/tabler-icons";
@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    SdSearchFieldComponent

  ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  viewProviders: [provideIcons({ featherAirplay, jamFilter, tablerUTurnLeft })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent { }
