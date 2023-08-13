import { createAction, props } from "@ngrx/store";
import { CartModel } from "src/app/core/models/carts.model";

export const addToCart = createAction(
  "[Cart] Add to Cart",
  props<{ cartData: CartModel }>()
);
