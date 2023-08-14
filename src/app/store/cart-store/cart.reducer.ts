import { Action, createReducer, on } from "@ngrx/store";
import { ProductModel } from "src/app/core/models/products.model";
import * as cartActions from "./cart.actions";

export const CART_FEATURE_KEY = "cart";

export interface CartState {
  totalQty: number;
  totalPrice: number;
  products: ProductModel[];
}

const initialState: CartState = {
  totalPrice: 0,
  totalQty: 0,
  products: [],
};

const reducer = createReducer(
  initialState,
  on(cartActions.addToCart, (state, { cartData }) => ({
    ...state,
    products: [...state.products, cartData.product],
    totalQty: state.totalQty + cartData.product.qty,
    totalPrice: state.totalPrice + cartData.product.price,
  }))
);

export function cartReducer(state: CartState | undefined, action: Action) {
  return reducer(state, action);
}
