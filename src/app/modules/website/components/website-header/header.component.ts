import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { CartsService } from "src/app/core/services/carts.service";
import { CartModel } from "src/app/core/models/carts.model";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-website-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class WebsiteHeaderComponent implements OnInit, OnDestroy {
  constructor(
    private readonly _cartsService: CartsService,
    readonly _usersService: UsersService,
    private readonly _router: Router
  ) {}

  subscription: Subscription = new Subscription();
  cartData!: CartModel;

  ngOnInit(): void {
    this.setCartData();
  }

  setCartData() {
    this.subscription.add(
      this._cartsService.cartDataSubject$.subscribe({
        next: (cart: CartModel) => (this.cartData = cart),
      })
    );
  }

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
