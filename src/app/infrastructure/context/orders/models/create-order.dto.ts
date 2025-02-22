export interface CreateOrderDto {
  description: string;
  storeId: string;
  file: File;
  sizeInMB: number;
  widthCm: number;
  heightCm: number;
}
