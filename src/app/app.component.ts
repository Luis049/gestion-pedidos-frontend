import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UiPreferencesService } from './ui-preferences.service';
import { NotificationModel, NotificationsService } from '@infrastructure/context/notifications/notifications.service';
import { ToastrService } from 'ngx-toastr';
import { StorageService } from '@infrastructure/shared/storage/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [UiPreferencesService, NotificationsService],
})
export class AppComponent implements OnInit {
  title = 'gestion-pedidos-frontend';
  constructor(private uiPreferencesService: UiPreferencesService) {}

  notificationsService = inject(NotificationsService);
  toastr = inject(ToastrService);

  ngOnInit(): void {
    this.uiPreferencesService.loadUserPreferences();
    const user = StorageService.getUser();
    if (user) {
      if (user.roles.includes('client')) {
        this.validateSubscription();
      }
    }
  }

  validateSubscription() {
    this.notificationsService.execute().subscribe((notification) => {
      this.toastr.info(this.messageNotificationChangedStatus(notification), 'Actualización de estado', {
        timeOut: 5000,
        enableHtml: true,
      });
    });
  }

  messageNotificationChangedStatus(notification: NotificationModel){
    switch(notification.order.status){
      case 'printing':
        return `Tu pedido <strong style="color: #000; font-weight: bold;">#${notification.order.ref}</strong> se empezó a imprimir`;
      case 'finished':
        return `Tu pedido <strong style="color: #000; font-weight: bold;">#${notification.order.ref}</strong> esta listo para ser entregado`;
      case 'delivered':
        return `Tu pedido <strong style="color: #000; font-weight: bold;">#${notification.order.ref}</strong> se entregó correctamente`;
      case 'archived':
        return `Tu pedido <strong style="color: #000; font-weight: bold;">#${notification.order.ref}</strong> fue archivado`;
      default:
        return `Estado del pedido <strong style="color: #000; font-weight: bold;">#${notification.order.ref}</strong> actualizado`;
    }
  }

}
