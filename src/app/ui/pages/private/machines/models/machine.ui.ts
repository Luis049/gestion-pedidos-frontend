export interface MachineUi {
  id: string;
  name: string;
  storeName: string;
  color: ColorUi;
}

export interface ColorUi {
  hex: string;
  name: string;
}
