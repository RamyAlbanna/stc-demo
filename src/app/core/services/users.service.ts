import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private readonly _router: Router) {}

  signIn() {
    this._router.navigate(["auth"]);
  }

  signOut() {
    localStorage.clear();
    this._router.navigate(["auth"]);
  }

  isUserSignedIn() {
    return localStorage.getItem("role") ? true : false;
  }
}
