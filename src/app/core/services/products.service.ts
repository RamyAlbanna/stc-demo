import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { ProductModel } from "../models/products.model";

@Injectable({
  providedIn: "root",
})
export class ProductsService {
  //dependences
  private readonly _http = inject(HttpClient);

  private readonly _apiUrl = environment.apiUrl;
  private readonly _productsApiUrl = `${this._apiUrl}/products`;

  getAll = (): Observable<ProductModel[]> =>
    this._http.get<ProductModel[]>(this._productsApiUrl);

  getAllByCategory = (category: string) =>
    this._http.get<ProductModel[]>(
      this._productsApiUrl + "/category/" + category
    );

  getOne = (id: number) =>
    this._http.get<ProductModel>(this._productsApiUrl + "/" + id);

  add = (product: ProductModel) =>
    this._http.post<ProductModel>(this._productsApiUrl, product);

  delete = (productId: number) =>
    this._http.delete<ProductModel>(this._productsApiUrl + "/" + productId);
}
