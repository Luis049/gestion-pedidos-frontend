import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { NgpInput } from "ng-primitives/input";
@Component({
  standalone: true,
  selector: "sd-input",
  imports: [
    ReactiveFormsModule,
    NgpInput,
  ],
  template: `
  <form [formGroup]="form">
    <input [attr.data-test-id]="dataTestId" ngpInput [type]="type" [placeholder]="placeholder" [formControlName]="formName" (change)="onChange($event)" />
</form>
  `,
  styleUrl: "./sd-input.component.scss",
})
export class SdInputComponent {
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
