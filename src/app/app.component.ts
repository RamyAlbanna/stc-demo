import { AfterViewInit, ChangeDetectorRef, Component } from "@angular/core";
import { LoadingService } from "./core/services/loading.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styles: [],
})
export class AppComponent implements AfterViewInit {
  showLoading = false;

  constructor(
    private readonly _loadingService: LoadingService,
    private cdr: ChangeDetectorRef
  ) {}
  ngAfterViewInit(): void {
    this._loadingService.loadingStatus$.subscribe((res) => {
      this.showLoading = res;
      this.cdr.detectChanges();
    });
  }
}
