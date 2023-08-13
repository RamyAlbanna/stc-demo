import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ProductModel } from "src/app/core/models/products.model";
import { CategoriesService } from "src/app/core/services/categories.service";
import { ProductsService } from "src/app/core/services/products.service";

@Component({
  selector: "app-shop",
  templateUrl: "./shop.component.html",
  styleUrls: ["./shop.component.scss"],
})
export class ShopComponent implements OnInit, OnDestroy {
  private readonly _productsService = inject(ProductsService);
  private readonly _categoriesService = inject(CategoriesService);
  private readonly _router = inject(Router);
  private readonly _toaster = inject(ToastrService);
  private _subscription: Subscription = new Subscription();
  categoriesList!: string[];
  productsList!: ProductModel[];

  ngOnInit(): void {
    this.setCategories();
    this.setProductsList();
  }

  setProductsList = () =>
    this._subscription.add(
      this._productsService.getAll().subscribe({
        next: (response) => {
          this.productsList = response;
        },
      })
    );

  setCategories = () =>
    this._subscription.add(
      this._categoriesService.getAll().subscribe({
        next: (response) => {
          this.categoriesList = response;
          this.categoriesList.unshift("all");
        },
      })
    );

  onCategoryClicked = (category: string) => {
    if (category === "all") {
      this.setProductsList();
      return;
    }

    this._productsService.getAllByCategory(category).subscribe({
      next: (response) => {
        this.productsList = response;
      },
    });
  };

  navigateToDetails = (id: number) =>
    this._router.navigate(["product-details", id]);

  ngOnDestroy = () => this._subscription.unsubscribe();
}
