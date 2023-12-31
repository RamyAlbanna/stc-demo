import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { AddProductDialogComponent } from "./add-product-dialog/add-product-dialog.component";
import { ToastrService } from "ngx-toastr";
import { ProductsService } from "src/app/core/services/products.service";
import { ProductModel } from "src/app/core/models/products.model";

@Component({
  selector: "app-admin",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();
  dataSource!: ProductModel[];

  constructor(
    private readonly _productsService: ProductsService,
    private readonly _dialogService: MatDialog,
    private readonly _toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.setDataSource();
  }

  setDataSource() {
    this._subscription.add(
      this._productsService.getAllProducts().subscribe({
        next: (response) => {
          this.dataSource = response;
        },
      })
    );
  }

  openDialog() {
    this._dialogService.open(AddProductDialogComponent, {
      width: "750px",
      height: "600px",
    });
  }

  onProductAdded() {
    this.openDialog();
  }

  onProductDeleted(id: number) {
    this._subscription.add(
      this._productsService.deleteProduct(id).subscribe({
        next: (response) => {
          this.dataSource = this.dataSource.filter(
            (row) => row.id !== response.id
          );
          this._toaster.success("Product Deleted Successfully!", "", {
            timeOut: 2000,
          });
        },
      })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
