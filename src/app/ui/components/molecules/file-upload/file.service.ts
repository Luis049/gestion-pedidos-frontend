import { Injectable } from '@angular/core';

interface PdfDimensions {
  widthCm: number;
  heightCm: number;
  widthInches: number;
  heightInches: number;
  dpi: number;
  widthPixels: number;
  heightPixels: number;
}

@Injectable({
  providedIn: 'root'
})
export class PdfDimensionsService {
  private readonly CM_PER_INCH = 2.54;

  /**
   * Calcula las dimensiones físicas de un PDF basado en sus dimensiones en píxeles y DPI
   * @param widthPixels - Ancho en píxeles
   * @param heightPixels - Alto en píxeles
   * @param dpi - Puntos por pulgada (DPI)
   * @returns Objeto con las dimensiones en centímetros, pulgadas y píxeles
   */
  calculateDimensions(widthPixels: number, heightPixels: number, dpi: number): PdfDimensions {
    // Cálculo de dimensiones en pulgadas
    const widthInches = widthPixels / dpi;
    const heightInches = heightPixels / dpi;

    // Conversión a centímetros
    const widthCm = widthInches * this.CM_PER_INCH;
    const heightCm = heightInches * this.CM_PER_INCH;

    return {
      widthCm: Number(widthCm.toFixed(2)),
      heightCm: Number(heightCm.toFixed(2)),
      widthInches: Number(widthInches.toFixed(2)),
      heightInches: Number(heightInches.toFixed(2)),
      dpi,
      widthPixels,
      heightPixels
    };
  }

  /**
   * Convierte dimensiones en centímetros a píxeles basado en DPI
   * @param widthCm - Ancho en centímetros
   * @param heightCm - Alto en centímetros
   * @param dpi - Puntos por pulgada (DPI)
   * @returns Objeto con las dimensiones en centímetros, pulgadas y píxeles
   */
  convertCmToPixels(widthCm: number, heightCm: number, dpi: number): PdfDimensions {
    // Conversión de centímetros a pulgadas
    const widthInches = widthCm / this.CM_PER_INCH;
    const heightInches = heightCm / this.CM_PER_INCH;

    // Conversión a píxeles
    const widthPixels = Math.round(widthInches * dpi);
    const heightPixels = Math.round(heightInches * dpi);

    return {
      widthCm,
      heightCm,
      widthInches: Number(widthInches.toFixed(2)),
      heightInches: Number(heightInches.toFixed(2)),
      dpi,
      widthPixels,
      heightPixels
    };
  }
}
