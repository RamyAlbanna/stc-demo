import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CART_FEATURE_KEY, CartState } from "./cart.reducer";

export const getState = createFeatureSelector<CartState>(CART_FEATURE_KEY);

export const getProducts = createSelector(getState, (state) => state.products);

export const getTotalQty = createSelector(getState, (state) => state.totalQty);

export const getTotalPrice = createSelector(
  getState,
  (state) => state.totalPrice
);
