import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from "@angular/core";
import { NgpButton } from "ng-primitives/button";
import {
  NgpDialog,
  NgpDialogDescription,
  NgpDialogOverlay,
  NgpDialogTitle,
  NgpDialogTrigger,
} from "ng-primitives/dialog";

@Component({
  standalone: true,
  selector: "app-dialog",
  imports: [
    NgpButton,
    NgpDialog,
    NgpDialogOverlay,
    NgpDialogTitle,
    NgpDialogDescription,
    NgpDialogTrigger,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {

  @ViewChild('dialogTrigger', { static: false }) private dialogTrigger!: ElementRef<HTMLButtonElement>;

  openDialog(){
    this.dialogTrigger.nativeElement.click();
  }

  closeDialog(){
    this.dialogTrigger.nativeElement.click();
  }
}
