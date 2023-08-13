import { NgModule } from "@angular/core";
import { SharedModule } from "../shared/shared.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { ProductsComponent } from "./components/products/products.component";
import { HeaderComponent } from "./components/header/header.component";
import { AddProductDialogComponent } from './components/products/add-product-dialog/add-product-dialog.component';

@NgModule({
  declarations: [ProductsComponent, HeaderComponent, AddProductDialogComponent],
  imports: [SharedModule],
  exports: [AdminRoutingModule],
})
export class AdminModule {}
