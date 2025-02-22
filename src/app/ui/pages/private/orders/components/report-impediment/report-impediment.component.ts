import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, ReactiveFormsModule, Validators } from '@angular/forms';
import { SdTextAreaComponent } from "../../../../../components/atoms/sd-text-area/sd-text-area.component";
import { HttpModule } from '@infrastructure/shared/http/http.module';
import { CommonModule } from '@angular/common';
import { SdButtonComponent } from "../../../../../components/atoms/sd-button/sd-button.component";
import { OrdersService } from '@infrastructure/context/orders/orders.service';
import { ReportImpedimentDto } from '@infrastructure/context/orders/models/report-impediment.dto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-impediment',
  standalone: true,
  imports: [
    CommonModule,
    SdTextAreaComponent,
    ReactiveFormsModule,
    HttpModule,
    SdButtonComponent
],
  templateUrl: './report-impediment.component.html',
  styleUrl: './report-impediment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportImpedimentComponent {

  @Input() orderId!: string;
  @Output() onSuccess = new EventEmitter<void>();
  @Output() onError = new EventEmitter<void>();

  orderService = inject(OrdersService);
  private toastr = inject(ToastrService);

  form = new FormGroup({
    description: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    const reportImpediment: ReportImpedimentDto = {
      description: this.form.value.description!,
      orderId: this.orderId,
    };
    this.orderService.reportImpediment(reportImpediment).subscribe({
      next: (res) => {
        res.fold(
          (error) => {
            this.onError.emit();
            let message = 'Error al enviar el reporte de impedimento';
            if(error.status === 400){
              message = Array.isArray(error.message) ? error.message[0] : error.message;
            }
            this.toastr.error(message);
          },
          (response) => {
            this.toastr.success('Reporte de impedimento enviado correctamente');
            this.onSuccess.emit();
          }
        )
      }
    });
  }
}
