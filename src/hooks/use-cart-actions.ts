import { useCart } from "@/context/cart/cart";
import { Product, ColorOption, StorageOption } from "@/types/product";

export function useCartActions() {
  const { addItem } = useCart();

  const handleAddToCart = (
    product: Product,
    selectedColor: ColorOption | null,
    selectedStorage: StorageOption | null
  ) => {
    if (selectedColor && selectedStorage) {
      const newItem = {
        id: product.id,
        name: product.name,
        colorOptions: selectedColor,
        storageOptions: selectedStorage,
        quantity: 1, 
      };

      console.log("test", newItem)

      addItem(newItem);
    }
  };

  return { handleAddToCart };
}