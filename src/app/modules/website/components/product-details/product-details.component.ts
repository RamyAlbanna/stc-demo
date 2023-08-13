import { Component, inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
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
  private readonly _router = inject(Router);
  private readonly _toaster = inject(ToastrService);

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
          this.productDetails.qty = 0;
        },
      })
    );

  prepareProductToAdd = () => {
    const productFound = this._cartsService.cartData.products.find(
      (row) => row.id === this.productDetails.id
    );
    this._cartsService.cartData.totalPrice += this.productDetails.price;
    this._cartsService.cartData.totalQty += this.qty.value!;
    if (productFound) productFound.qty += this.qty.value!;
    else {
      this.productDetails.qty += this.qty.value!;
      this._cartsService.cartData.products.push(this.productDetails);
    }
  };

  onAddedToCart = () => {
    if (!this.qty.value!) {
      this._toaster.warning("Please insert a quantity!", "", {
        timeOut: 2000,
      });
      return;
    }
    this.prepareProductToAdd();
    this._cartsService.addToCart(this._cartsService.cartData);
    this._toaster.success("Added to Cart Successfully!", "", { timeOut: 2000 });
    this._router.navigate([""]);
  };

  onAddOne = () => this.qty.setValue(this.qty.value! + 1);

  onRemoveOne = () => {
    if (this.qty.value! !== 0) this.qty.setValue(this.qty.value! - 1);
  };

  ngOnDestroy = () => this._subscription.unsubscribe();
}
