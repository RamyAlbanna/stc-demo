import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ProductModel } from "src/app/core/models/products.model";
import { ProductsService } from "src/app/core/services/products.service";
import { CartState } from "src/app/store/cart-store/cart.reducer";
import * as cartActions from "src/app/store/cart-store/cart.actions";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent {
  private _subscription: Subscription = new Subscription();
  productDetails!: ProductModel;
  qty = new FormControl(1);

  constructor(
    private readonly _productsService: ProductsService,
    private readonly _activatedRouteService: ActivatedRoute,
    private readonly _router: Router,
    private readonly _toaster: ToastrService,
    private cartStore: Store<CartState>
  ) {}

  ngOnInit() {
    this._activatedRouteService.paramMap.subscribe({
      next: (params) => {
        this.setProductDetails(+params.get("id")!);
      },
    });
  }

  setProductDetails(id: number) {
    this._subscription.add(
      this._productsService.getOneProduct(id).subscribe({
        next: (response) => {
          this.productDetails = response;
          this.productDetails.qty = 0;
        },
      })
    );
  }

  onAddedToCart() {
    if (!this.qty.value!) {
      this._toaster.warning("Please insert a quantity!", "", {
        timeOut: 2000,
      });
      return;
    }
    this.productDetails.qty = this.qty.value!;
    this.cartStore.dispatch(
      cartActions.addToCart({
        cartData: {
          product: this.productDetails,
        },
      })
    );
    this._toaster.success("Added to Cart Successfully!", "", { timeOut: 2000 });
    this._router.navigate([""]);
  }

  onAddOne() {
    this.qty.setValue(this.qty.value! + 1);
  }

  onRemoveOne() {
    if (this.qty.value! !== 0) this.qty.setValue(this.qty.value! - 1);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
