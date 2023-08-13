import { Component, OnDestroy, OnInit, inject } from "@angular/core";
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
  private readonly _productsService = inject(ProductsService);
  private readonly _dialogService = inject(MatDialog);
  private readonly _toaster = inject(ToastrService);
  private _subscription: Subscription = new Subscription();
  dataSource!: ProductModel[];

  ngOnInit(): void {
    this.setDataSource();
  }

  setDataSource = () =>
    this._subscription.add(
      this._productsService.getAll().subscribe({
        next: (response) => {
          this.dataSource = response;
        },
      })
    );

  openDialog = () =>
    this._dialogService.open(AddProductDialogComponent, {
      width: "750px",
      height: "600px",
    });

  onProductAdded = () => this.openDialog();

  onProductDeleted = (id: number) =>
    this._subscription.add(
      this._productsService.delete(id).subscribe({
        next: (response) => {
          this.dataSource = this.dataSource.filter(
            (row) => row.id !== response.id
          );
          this._toaster.success("Product Deleted Successfully!");
        },
      })
    );

  ngOnDestroy = () => this._subscription.unsubscribe();
}
