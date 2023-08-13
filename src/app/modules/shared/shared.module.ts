import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatInputModule } from "@angular/material/input";
import { MatCardModule } from "@angular/material/card";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTableModule } from "@angular/material/table";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatSelectModule } from "@angular/material/select";
import { MatOptionModule } from "@angular/material/core";
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from "ngx-toastr";
import { NgxLoadingModule, ngxLoadingAnimationTypes } from "ngx-loading";
import { CommonModule } from "@angular/common";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  imports: [
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBackgroundColour: "rgba(0,0,0,0.1)",
      fullScreenBackdrop: true,
      backdropBorderRadius: "4px",
    }),
    ToastrModule.forRoot({
      positionClass: "toast-top-right",
    }),
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatToolbarModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    ToastrModule,
    NgxLoadingModule,
  ],
})
export class SharedModule {}
