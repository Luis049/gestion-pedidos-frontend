
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy } from '@angular/core';
import { Component, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgIcon, provideIcons } from "@ng-icons/core";
import { heroMagnifyingGlass } from "@ng-icons/heroicons/outline";
import { NgpButton } from "ng-primitives/button";
import { NgpLabel } from "ng-primitives/form-field";
import { NgpInput } from "ng-primitives/input";
import { NgpSearchField, NgpSearchFieldClear } from "ng-primitives/search";
@Component({
  selector: 'sd-search-field',
  standalone: true,
  imports: [
    NgpSearchField,
    NgpLabel,
    NgpInput,
    NgIcon,
    NgpButton,
    NgpSearchFieldClear,
    FormsModule,
  ],
  templateUrl: './sd-search-field.component.html',
  styleUrl: './sd-search-field.component.scss',
  providers: [provideIcons({ heroMagnifyingGlass })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdSearchFieldComponent {
   /**
   * Store the search query.
   */
   readonly query = signal<string>("");
}
