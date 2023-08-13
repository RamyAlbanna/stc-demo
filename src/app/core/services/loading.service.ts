import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LoadingService {
  loadingStatus$ = new BehaviorSubject(false);

  showSpinner() {
    this.loadingStatus$.next(true);
  }
  hideSpinner() {
    this.loadingStatus$.next(false);
  }
}
