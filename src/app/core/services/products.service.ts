import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { ProductModel } from "../models/products.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  constructor(private readonly _http: HttpClient) {}

  private readonly _apiUrl = environment.apiUrl;
  private readonly _productsApiUrl = `${this._apiUrl}/products`;

  getAllProducts(): Observable<ProductModel[]> {
    return this._http.get<ProductModel[]>(this._productsApiUrl);
  }

  getAllProductsByCategory(category: string) {
    return this._http.get<ProductModel[]>(
      this._productsApiUrl + "/category/" + category
    );
  }

  getOneProduct(id: number) {
    return this._http.get<ProductModel>(this._productsApiUrl + "/" + id);
  }

  addProduct(product: ProductModel) {
    return this._http.post<ProductModel>(this._productsApiUrl, product);
  }

  deleteProduct(productId: number) {
    return this._http.delete<ProductModel>(
      this._productsApiUrl + "/" + productId
    );
  }
}
