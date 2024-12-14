
import { Component, Output, EventEmitter, signal, OnInit, Input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroCloudArrowUp } from '@ng-icons/heroicons/outline';
import { PdfDimensionsService } from "./file.service";

export interface FileInfo {
  file: File;
  name: string;
  sizeInMB: number;
  dimensions?: {
    widthCm: number;
    heightCm: number;
  };
}

@Component({
  selector: 'sd-file-upload',
  standalone: true,
  imports: [NgIcon],
  viewProviders: [provideIcons({ heroCloudArrowUp })],
  templateUrl: './file-upload.component.html',
  providers: [PdfDimensionsService],
})
export class SdFileUploadComponent implements OnInit {
  private readonly MAX_SIZE = 1024 * 1024 * 1024; // 1GB en bytes

  @Input() dataTestId: string = '';

  isDragging = signal(false);
  selectedFile = signal<FileInfo | null>(null);
  errorMessage = signal<string>('');

  @Output() fileSelected = new EventEmitter<FileInfo>();

  constructor(
    private pdfDimensionsService: PdfDimensionsService
  ) {
  }
  ngOnInit(): void {
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const files = event.dataTransfer?.files;
    if (files?.length) {
      this.validateAndSetFile(files[0]);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (files?.length) {
      this.validateAndSetFile(files[0]);
    }

    input.value = '';
  }

  private validateAndSetFile(file: File) {
    this.errorMessage.set('');

    if (!file.type.includes('pdf')) {
      this.errorMessage.set('Solo se permiten archivos PDF');
      return;
    }

    if (file.size > this.MAX_SIZE) {
      this.errorMessage.set('El archivo excede el límite de 1GB');
      return;
    }

    this.processFile(file);
  }

  private processFile(file: File) {
    if (!file.type.includes('pdf')) {
      this.errorMessage.set('Por favor, selecciona un archivo PDF válido.');
      return;
    }

    this.errorMessage.set('');

    // Crear un FileReader para leer el PDF
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        // Cargar el PDF usando pdf.js (necesitarás importar la librería)
        const pdfData = new Uint8Array(e.target?.result as ArrayBuffer);
        const pdf = await (window as any).pdfjsLib.getDocument({ data: pdfData }).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 1 });

        // Obtener dimensiones en píxeles y DPI
        const widthPixels = viewport.width;
        const heightPixels = viewport.height;
        const dpi = 72; // PDF estándar usa 72 DPI por defecto

        // Calcular dimensiones usando nuestro servicio
        const dimensions = this.pdfDimensionsService.calculateDimensions(
          widthPixels,
          heightPixels,
          dpi
        );

        const pdfInfo: FileInfo = {
          file,
          name: file.name,
          sizeInMB: Number((file.size / (1024 * 1024)).toFixed(2)),
          dimensions: {
            heightCm: dimensions.heightCm,
            widthCm: dimensions.widthCm,
          }
        };

        this.selectedFile.set(pdfInfo);
        this.fileSelected.emit(pdfInfo);

      } catch (error) {
        this.errorMessage.set('Error al procesar el PDF. Por favor, intenta con otro archivo.');
        console.error('Error processing PDF:', error);
      }
    };

    reader.readAsArrayBuffer(file);
  }

}
