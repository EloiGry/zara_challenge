import { ColorOption, StorageOption } from './product';

export interface CartItem {
  id: string;
  name: string;
  colorOptions: ColorOption;
  storageOptions: StorageOption;
  quantity: number;
}
