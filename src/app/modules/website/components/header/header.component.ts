import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { CartsService } from "src/app/core/services/carts.service";
import { CartModel } from "src/app/core/models/carts.model";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  private readonly _cartsService = inject(CartsService);
  private readonly _router = inject(Router);

  subscription: Subscription = new Subscription();
  cartData!: CartModel;

  ngOnInit(): void {
    this.setCartData();
  }

  setCartData = () => {
    this._cartsService.cartDataSubject$.subscribe({
      next: (cart: CartModel) => (this.cartData = cart),
    });
  };

  onSignIn = () => {
    this._router.navigate(["auth"]);
  };
}
