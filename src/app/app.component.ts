import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
} from "@angular/core";
import { LoadingService } from "./core/services/loading.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements AfterViewInit {
  showLoading = false;

  constructor(private readonly _loadingService: LoadingService) {}
  ngAfterViewInit(): void {
    this._loadingService.loadingStatus$.subscribe((res) => {
      this.showLoading = res;
    });
  }
}
