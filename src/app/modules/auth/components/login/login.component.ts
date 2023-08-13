import { Component, OnDestroy, OnInit, inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  // dependencies
  private readonly _router = inject(Router);
  private readonly _toaster = inject(ToastrService);

  loginForm!: FormGroup;
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  onLogin = () => {
    if (!this.isUserValid()) return;
    this.navigateDependsOnRole();
    this._toaster.success("User Successfully Logged in!");
  };

  getFormControl = (controlName: string): FormControl =>
    this.loginForm.controls[controlName] as FormControl;

  isUserValid = () =>
    this.getFormControl("userName" && "password")?.value === "admin" ||
    this.getFormControl("userName" && "password")?.value === "user";

  navigateDependsOnRole = () => {
    if (this.getFormControl("userName")?.value === "admin")
      this._router.navigate(["admin"]);
    else this._router.navigate([""]);
  };
}
