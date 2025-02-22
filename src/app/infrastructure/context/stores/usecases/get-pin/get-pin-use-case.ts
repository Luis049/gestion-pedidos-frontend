import { Injector, NgZone } from "@angular/core";
import { ProcessFailure } from "../../../../api/ProcessFailure/process-failure";
import { Either } from "../../../../Either/either";
import { GetUseCase } from "../../../../http/usecases/get-use-case/get.usecase";
import { StoreModel } from "../../models/store.model";
import { Observable, Subscriber } from "rxjs";
import { SSE } from "sse.js";
import { GetTokenUseCase } from "../../../../api/usecases/get-token-use-case/get-token-use-case";

export class GetPinUseCase {
  eventSource!: SSE;

  constructor(
    private httpUseCase: HttpUseCase,
    private getTokenUseCase: GetTokenUseCase
  ) {}

  async execute(): Promise<Either<ProcessFailure, StoreModel[]>> {
    try {
      const response = await this.httpUseCase.get("/stores/sse");
      console.log(response);
      return Either.right<ProcessFailure, StoreModel[]>(response);
    } catch (error: any) {
      console.log(error);
      return Either.left<ProcessFailure, StoreModel[]>(error);
    }
  }
  /**
   * Create an event source of GET request
   * @param API url
   * @formData data (file, ...etc.)
   */
  public getEventSourceWithGet(): Promise<SSE> {
    return this.buildEventSource();
  }

  /**
   * Building the event source
   * @param url  API URL
   * @param meth  (POST, GET, ...etc.)
   * @param formData data
   */
  private async buildEventSource(): Promise<SSE> {
    EventSource
    this.eventSource = new SSE('http://localhost:3000/api/v1/stores/sse', {
      method: 'GET',
      headers: {
        Authorization: (await this.checkAuthorization()),
      }
    });

    // add listener
    this.eventSource.addEventListener("message", (e: any) => {
      return e.data;
    });

    return this.eventSource;
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
  protected async checkAuthorization(): Promise<string> {
    const authToken = (await this.getTokenUseCase.execute()) || "";
    const auth = "Bearer " + authToken;
    return auth;
  }

  /**
   * Build query options
   * @param meth POST or GET
   * @param formData data
   */
  private async buildOptions(
    meth: string,
  ): Promise<{
    method: string;
    headers: string | { Authorization: string };
  }> {
    const auth = await this.checkAuthorization();
    return {
      method: meth,
      headers: auth !== "" ? { Authorization: auth } : "",
    };
  }
}
