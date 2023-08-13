import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { CartModel } from "src/app/core/models/carts.model";
import { UsersService } from "src/app/core/services/users.service";
import { CartState } from "src/app/store/cart-store/cart.reducer";
import * as cartSelectors from "src/app/store/cart-store/cart.selectors";

@Component({
  selector: "app-website-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class WebsiteHeaderComponent implements OnDestroy {
  products$ = this._store.select(cartSelectors.getProducts);
  totalPrice$ = this._store.select(cartSelectors.getTotalPrice);
  totalQty$ = this._store.select(cartSelectors.getTotalQty);
  subscription: Subscription = new Subscription();
  cartData!: CartModel;

  constructor(
    readonly _usersService: UsersService,
    private readonly _store: Store<CartState>
  ) {}

  onSignInOrOut() {
    if (this._usersService.isUserSignedIn()) {
      this._usersService.signOut();
    } else {
      this._usersService.signIn();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
