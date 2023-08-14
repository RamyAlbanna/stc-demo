import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ProductsService } from "src/app/core/services/products.service";

@Component({
  selector: "app-add-product-dialog",
  templateUrl: "./add-product-dialog.component.html",
  styleUrls: ["./add-product-dialog.component.scss"],
})
export class AddProductDialogComponent {
  private _subscription: Subscription = new Subscription();
  addProuctForm!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private readonly _dialogRef: MatDialogRef<AddProductDialogComponent>,
    private readonly _productsService: ProductsService,
    private readonly _toaster: ToastrService
  ) {}

  ngOnInit() {
    this.addProuctForm = new FormGroup({
      title: new FormControl("", [Validators.required]),
      description: new FormControl("", [Validators.required]),
      price: new FormControl("", [Validators.required]),
      category: new FormControl("", [Validators.required]),
      image: new FormControl("", [Validators.required]),
    });
  }

  onProductAdded() {
    this._subscription.add(
      this._productsService
        .addProduct(this.addProuctForm.value)
        .subscribe(() => {
          this._dialogRef.close();
          this._toaster.success("Product Added Successfully!", "", {
            timeOut: 2000,
          });
        })
    );
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
