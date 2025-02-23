import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { HttpService } from "./http.service";
import { NgModule } from "@angular/core";
import { HttpGateway } from "../../../domain/http/http.gateway";
import { HttpUseCase } from "../../../domain/http/usecases/http.usecases";
import { APIInterceptor } from "./HttpInterceptor";
import { CompaniesService } from "@infrastructure/context/companies/companies.service";
import { StoresService } from "@infrastructure/context/stores/stores.service";
import { MachinesService } from "@infrastructure/context/machines/machines.service";
import { OperatorsService } from "@infrastructure/context/operators/operators.service";
import { OrdersService } from "@infrastructure/context/orders/orders.service";
import { ParamsService } from "@infrastructure/context/params/params.service";
import { ShowOrdersService } from "@infrastructure/context/orders/show-orders.service";

@NgModule({
  imports: [HttpClientModule],
  providers: [
    HttpUseCase,
    CompaniesService,
    StoresService,
    MachinesService,
    OperatorsService,
    OrdersService,
    ShowOrdersService,
    ParamsService,
    {
      provide: HttpGateway,
      useClass: HttpService,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    }
  ],
})
export class HttpModule {}
