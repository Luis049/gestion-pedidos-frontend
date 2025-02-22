
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { SdSelectComponent } from "../../atoms/sd-select/sd-select.component";
import { TypeColors, SdCirculeColorComponent } from '../../atoms/sd-circule-color/sd-circule-color.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherChevronDown } from '@ng-icons/feather-icons';
import { HttpService } from '@infrastructure/shared/http/http.service';
import { ParamsService } from '@infrastructure/context/params/params.service';
import { ColorModel } from '@infrastructure/context/params/models/colors.model';
import { take } from 'rxjs';


@Component({
  selector: 'sd-input-color',
  standalone: true,
  imports: [
    CommonModule,
    SdSelectComponent,
    SdCirculeColorComponent,

    NgIcon
],
  templateUrl: './sd-input-color.component.html',
  providers: [provideIcons({  featherChevronDown }), HttpService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdInputColorComponent {
  private readonly paramsService = inject(ParamsService);
  @Output() colorSelectedChange = new EventEmitter<ColorModel>();
  @Input() dataTestId: string = '';
  open = false;
  colorItemsModel = signal<ColorModel[]>([]);

  @Input() colorSelectedId = signal<string>('');
  colorSelected = computed(() => this.colorItemsModel().find((item) => item.id === this.colorSelectedId()) ?? null);

  constructor() {
    if(this.colorItemsModel().length === 0){
      this.paramsService.getColors()
      .pipe(take(1))
      .subscribe((res) => {
        res.fold(
          (error) => {
            console.log(error);
          },
          (response) => {
            this.colorItemsModel.set(response);
            if(this.colorSelectedId() === ''){
              this.colorSelectedId.set(response[0].id);
              this.colorSelectedChange.emit(response[0]);
            }
          },
        );
      });
    }
  }

  onChange(idColor: string) {
    const color = this.colorItemsModel().find((item) => item.id === idColor) ?? null;
    if(color){
      this.colorSelectedId.set(color?.id ?? '');
      this.open = false;
      this.colorSelectedChange.emit(color);
    }
  }

 }
