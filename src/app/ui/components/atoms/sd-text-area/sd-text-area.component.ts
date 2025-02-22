import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { NgpInput } from "ng-primitives/input";
@Component({
  standalone: true,
  selector: "sd-text-area",
  imports: [
    ReactiveFormsModule,
    NgpInput,
  ],
  templateUrl: "./sd-text-area.component.html",
  styleUrl: "./sd-text-area.component.scss",
})
export class SdTextAreaComponent {
  @Input() placeholder: string = "";
  @Input() formName: string = "";
  @Input() type: string = 'text';
  @Input() dataTestId: string = '';
  @Output() changeInput = new EventEmitter<Event>();
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }

  onChange(event: Event) {
    this.changeInput.emit(event);
  }
}
