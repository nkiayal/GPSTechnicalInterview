import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./pages/nav-menu/nav-menu.component";
import { CreateApplicationComponent } from "./pages/create-application/create-application.component";
import { AppRoutingModule } from "./app-routing.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material.module";
import { ApplicationsComponent } from "./pages/applications/applications.component";
import { StatusPipe } from "./pipes/status.pipe";
import { WarningComponent } from "./dialogs/warning-dialog/warning.component";
import { SnackBar } from "./shared/ux-components/snack-bar/snack-bar.component";

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ApplicationsComponent,
    CreateApplicationComponent,
    StatusPipe,
    WarningComponent,
    SnackBar,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
  ],
  providers: [SnackBar],
  bootstrap: [AppComponent],
})
export class AppModule {}
