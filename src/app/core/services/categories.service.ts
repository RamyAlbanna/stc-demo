import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  private readonly _http = inject(HttpClient);

  private readonly _apiUrl = environment.apiUrl;
  private readonly _categoriesApiUrl = `${this._apiUrl}/products/categories`;

  getAll = (): Observable<string[]> =>
    this._http.get<string[]>(this._categoriesApiUrl);
}
