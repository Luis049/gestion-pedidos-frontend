import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiPreferencesService } from './ui-preferences.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    UiPreferencesService
  ]
})
export class AppComponent implements OnInit {
  title = 'gestion-pedidos-frontend';
  constructor(private uiPreferencesService: UiPreferencesService) {}
  ngOnInit(): void {
    this.uiPreferencesService.loadUserPreferences();
  }
}
