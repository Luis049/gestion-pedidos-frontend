import { Component, Input } from "@angular/core";
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
    <input ngpInput type="text" [placeholder]="placeholder" [formControlName]="formName" />
</form>
  `,
  styleUrl: "./sd-input.component.scss",
})
export class SdInputComponent {
  @Input() placeholder: string = "";
  @Input() formName: string = "";
  form!: FormGroup;

  constructor(private rootFormGroup: FormGroupDirective) {}

  ngOnInit(): void {
    this.form = this.rootFormGroup.control;
  }
}
