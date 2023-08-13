import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { ProductsComponent } from "./components/products/products.component";
import { AddProductDialogComponent } from "./components/products/add-product-dialog/add-product-dialog.component";
import { LayoutComponent } from "./layout/layout.component";
import { AdminHeaderComponent } from "./components/admin-header/header.component";

@NgModule({
  declarations: [
    LayoutComponent,
    ProductsComponent,
    AdminHeaderComponent,
    AddProductDialogComponent,
  ],
  imports: [AdminRoutingModule, SharedModule],
})
export class AdminModule {}
