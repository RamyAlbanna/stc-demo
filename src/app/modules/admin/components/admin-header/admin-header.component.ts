import { Component } from "@angular/core";
import { UsersService } from "src/app/core/services/users.service";

@Component({
  selector: "app-admin-header",
  templateUrl: "./admin-header.component.html",
  styleUrls: ["./admin-header.component.scss"],
})
export class AdminHeaderComponent {
  constructor(private readonly _usersService: UsersService) {}

  onSignOut() {
    this._usersService.signOut();
  }
}
