import { Injectable, inject } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  private readonly _router = inject(Router);
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (
      state.url.includes("admin") &&
      !localStorage.getItem("role")?.includes("admin")
    ) {
      this._router.navigate(["auth"]);
      return false;
    }
    return true;
  }
}
