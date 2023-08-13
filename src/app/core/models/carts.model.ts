import { ProductModel } from "./products.model";

export type CartModel = {
  id: number;
  date?: string | undefined;
  totalPrice: number;
  totalQty: number;
  products: ProductModel[];
};
