import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { ShopComponent } from "./components/shop/shop.component";
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { CartComponent } from "./components/cart/cart.component";
const routes: Routes = [
  {
    path: "",
    redirectTo: "shop",
    pathMatch: "full",
  },
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "shop",
        component: ShopComponent,
      },
      {
        path: "product-details/:id",
        component: ProductDetailsComponent,
      },
      {
        path: "cart",
        component: CartComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
