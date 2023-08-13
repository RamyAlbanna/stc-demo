import { Component, inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { CartModel } from "src/app/core/models/carts.model";
import { ProductModel } from "src/app/core/models/products.model";
import { CartsService } from "src/app/core/services/carts.service";
import { ProductsService } from "src/app/core/services/products.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"],
})
export class ProductDetailsComponent {
  private readonly _productsService = inject(ProductsService);
  private readonly _cartsService = inject(CartsService);
  private readonly _activatedRouteService = inject(ActivatedRoute);

  private _subscription: Subscription = new Subscription();
  productDetails!: ProductModel;
  qty = new FormControl(1);

  ngOnInit(): void {
    this._activatedRouteService.paramMap.subscribe({
      next: (params) => {
        this.setProductDetails(+params.get("id")!);
      },
    });
  }

  setProductDetails = (id: number) =>
    this._subscription.add(
      this._productsService.getOne(id).subscribe({
        next: (response) => {
          this.productDetails = response;
        },
      })
    );

  onAddedToCart = () => {
    this._cartsService.cartData.totalPrice += this.productDetails.price;
    this._cartsService.cartData.totalQty += this.qty.value!;
    this._cartsService.addToCart(this._cartsService.cartData);
  };

  ngOnDestroy = () => this._subscription.unsubscribe();
}
