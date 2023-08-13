import { Injectable } from "@angular/core";
import { CartModel } from "../models/carts.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CartsService {
  cartData!: CartModel;
  cartData$: Subject<CartModel> = new BehaviorSubject<CartModel>({
    id: 1,
    products: [],
    totalPrice: 0,
    totalQty: 0,
  });

  constructor() {
    this.setCartData();
  }

  setCartData = () => {
    this.cartData$.subscribe({
      next: (cart: CartModel) => (this.cartData = cart),
    });
  };

  addToCart = (cart: CartModel): void => {
    this.cartData$.next(cart);
  };
}
