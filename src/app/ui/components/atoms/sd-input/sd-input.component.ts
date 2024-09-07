import { Component, Input } from "@angular/core";
import { NgpInput } from "ng-primitives/input";
@Component({
  standalone: true,
  selector: "sd-input",
  imports: [NgpInput],
  template: `<input ngpInput type="text" [placeholder]="placeholder" />`,
  styleUrl: "./sd-input.component.scss",
})
export class SdInputComponent {
  @Input() placeholder: string = "";
}
