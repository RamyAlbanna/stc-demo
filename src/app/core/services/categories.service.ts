import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private readonly _http: HttpClient) {}

  private readonly _apiUrl = environment.apiUrl;
  private readonly _categoriesApiUrl = `${this._apiUrl}/products/categories`;

  getAllCategories(): Observable<string[]> {
    return this._http.get<string[]>(this._categoriesApiUrl);
  }
}
