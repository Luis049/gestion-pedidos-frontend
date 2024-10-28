import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCloudArrowUp } from '@ng-icons/heroicons/outline';
import { NgpFileUpload } from "ng-primitives/file-upload";

@Component({
  selector: 'sd-file-upload',
  standalone: true,
  imports: [
    CommonModule,
    NgpFileUpload,
    NgIcon
  ],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  viewProviders: [provideIcons({ heroCloudArrowUp })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SdFileUploadComponent {

  nameFile: string |null = null;
  @Output() fileUploaded = new EventEmitter<FileList>();

  onFilesSelected(file: FileList | null) {
    this.nameFile = file?.item(0)?.name || '';
    if(file?.item(0)){
      this.fileUploaded.emit(file);
    }
  }
}
