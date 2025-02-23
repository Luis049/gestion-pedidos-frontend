import { SSE } from "sse.js";
import { Observable } from "rxjs";
import { OrderModel } from "./models/order.model";
import { StorageService } from "@infrastructure/shared/storage/storage.service";
import { environment } from "src/environments/environment";

export class ShowOrdersService {

  eventSource!: SSE;

  execute(): Observable<OrderModel[]> {
    return new Observable<OrderModel[]>(subscriber => {
      const host = environment.apiUrl;
      const auth = this.checkAuthorization();
      this.eventSource = new SSE(`${host}orders/subscribe`, {
        method: 'GET',
        headers: {
          Authorization: auth,
        }
      });
      this.eventSource.addEventListener("message", (e: any) => {
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
