import { NgModule } from "@angular/core";
import { AuthRoutingModule } from "./website-routing.module";
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from "./layout/layout.component";
import { HeaderComponent } from "./components/header/header.component";
import { ShopComponent } from './components/shop/shop.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, ShopComponent, ProductDetailsComponent, CartComponent],
  imports: [AuthRoutingModule, SharedModule],
})
export class WebsiteModule {}
