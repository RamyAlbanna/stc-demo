import { Component, inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  private readonly _router = inject(Router);
  onSignOut = () => {
    localStorage.clear();
    this._router.navigate(["auth"]);
  };
}
