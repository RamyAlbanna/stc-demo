import { NgModule } from "@angular/core";
import { WebSiteRoutingModule } from "./website-routing.module";
import { SharedModule } from "../shared/shared.module";
import { LayoutComponent } from "./layout/layout.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { WebsiteHeaderComponent } from "./components/website-header/header.component";
import { WebsiteFooterComponent } from "./components/website-footer/footer.component";

@NgModule({
  declarations: [
    LayoutComponent,
    WebsiteHeaderComponent,
    ShopComponent,
    ProductDetailsComponent,
    WebsiteFooterComponent,
  ],
  imports: [WebSiteRoutingModule, SharedModule],
})
export class WebsiteModule {}
