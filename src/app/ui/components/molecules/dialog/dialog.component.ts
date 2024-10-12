import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, signal, ViewChild } from "@angular/core";
import { NgpButton } from "ng-primitives/button";
import {
  NgpDialog,
  NgpDialogDescription,
  NgpDialogOverlay,
  NgpDialogTitle,
  NgpDialogTrigger,
} from "ng-primitives/dialog";
import { SdButtonComponent } from "../../atoms/sd-button/sd-button.component";

@Component({
  standalone: true,
  selector: "sd-dialog",
  imports: [
    NgpButton,
    NgpDialog,
    NgpDialogOverlay,
    NgpDialogTitle,
    NgpDialogDescription,
    NgpDialogTrigger,
    SdButtonComponent
],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

  @Input() title: string = '';
  visible = signal(false);
  @ViewChild('dialogTrigger', { static: false }) private dialogTrigger!: ElementRef<HTMLButtonElement>;

  openDialog(){
    this.visible.set(true);
  }

  closeDialog(){
    this.visible.set(false);
  }
}
