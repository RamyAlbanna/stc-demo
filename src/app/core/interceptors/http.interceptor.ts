import { Injectable, inject } from "@angular/core";
import {
  HttpInterceptor,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { map, catchError, finalize } from "rxjs/operators";
import { LoadingService } from "../services/loading.service";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  private readonly _loadingService = inject(LoadingService);
  private readonly _toasterService = inject(ToastrService);

  intercept(request: any, next: HttpHandler): Observable<HttpEvent<any>> {
    this._loadingService.showSpinner();
    let headers: HttpHeaders = new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    });
    const newRequest = request.clone(headers);
    return next.handle(newRequest).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (!error?.ok)
          this._toasterService.error(error?.message), "", { timeOut: 2000 };
        return throwError(() => error);
      }),
      finalize(() => {
        this._loadingService.hideSpinner();
      })
    );
  }
}
