import { SSE } from "sse.js";
import { Observable } from "rxjs";
import { StorageService } from "@infrastructure/shared/storage/storage.service";
import { environment } from "src/environments/environment";
import { OrderModel } from "../orders/models/order.model";

export interface NotificationModel {
  order: OrderModel;
  message: string;
}


export class NotificationsService {

  eventSource!: SSE;

  execute(): Observable<NotificationModel> {
    return new Observable<NotificationModel>(subscriber => {
      const host = environment.apiUrl;
      const auth = this.checkAuthorization();
      this.eventSource = new SSE(`${host}orders/notification/changedStatus`, {
        method: 'GET',
        headers: {
          Authorization: auth,
        }
      });
      this.eventSource.addEventListener("changedStatus", (e: any) => {
        subscriber.next(JSON.parse(e.data));
      });
    });
  }

  /**
   * close connection
   */
  public closeEventSource() {
    if (!!this.eventSource) {
      this.eventSource.close();
    }
  }

  /**
   * Récupération du token à passer dans le header de la requête
   */
  protected checkAuthorization(): string {
    const authToken = StorageService.getToken();
    const auth = "Bearer " + authToken;
    return auth;
  }

}
