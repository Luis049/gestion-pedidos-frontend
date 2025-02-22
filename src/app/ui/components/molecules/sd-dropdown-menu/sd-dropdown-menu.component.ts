import { ElementRef, inject } from '@angular/core';
import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { CommonModule } from '@angular/common';
import { lucideBan, lucideFile, lucideTableProperties } from '@ng-icons/lucide';

interface MenuItem<T> {
  label: string;
  icon: string;
  event: T;
  disabled?: boolean;
  action: (event: T) => void;
}

@Component({
  selector: 'sd-dropdown-menu',
  templateUrl: './sd-dropdown-menu.component.html',
  styleUrls: ['./sd-dropdown-menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NgIcon
  ],
  providers: [provideIcons({ lucideFile, lucideBan, lucideTableProperties })],
})
export class DropdownMenuComponent<T> {
  @Input() items: MenuItem<T>[] = [];
  @Input() isOpen = false;

  elementRef = inject(ElementRef);

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}
