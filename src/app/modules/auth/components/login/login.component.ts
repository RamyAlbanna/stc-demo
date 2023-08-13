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
    if (!this.isUserValid()) {
      this._toaster.error("Invalid Credintials!", "", { timeOut: 2000 });
      return;
    }
    this.navigateDependsOnRole();
    this._toaster.success("User Successfully Logged in!", "", {
      timeOut: 2000,
    });
  };

  getFormControl = (controlName: string): FormControl =>
    this.loginForm.controls[controlName] as FormControl;

  isUserValid = () =>
    (this.getFormControl("userName")?.value === "admin" &&
      this.getFormControl("password")?.value === "admin") ||
    (this.getFormControl("userName")?.value === "user" &&
      this.getFormControl("password")?.value === "user");

  navigateDependsOnRole = () => {
    if (this.getFormControl("userName")?.value === "admin") {
      localStorage.setItem("role", "admin");
      this._router.navigate(["admin"]);
    } else {
      localStorage.setItem("role", "user");
      this._router.navigate([""]);
    }
  };
}
