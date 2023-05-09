import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CurrencyPipe } from '@angular/common';

import { AppComponent } from "./app.component";
import { NavMenuComponent } from "./nav-menu/nav-menu.component";
import { AppRoutingModule } from "./app-routing.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./shared/material.module";
import { ApplicationsComponent } from "./applications/applications.component";
import { EditLoanComponent } from "./components/edit-loan/edit-loan.component";
import { ConfirmDeleteComponent } from "./components/dialogs/confirm-delete/confirm-delete.component"
import { SnackbarComponent } from "./components/snackbar/snackbar.component"

import { RequestorLoanApplicationSerivce } from "./providers/requestor-loan-application.service";
import { SnackbarService } from "./providers/snackbar.service";


@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        ApplicationsComponent,
        EditLoanComponent,
        ConfirmDeleteComponent,
        SnackbarComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: "ng-cli-universal" }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NoopAnimationsModule,
        MaterialModule,
        BrowserAnimationsModule
    ],
    providers: [RequestorLoanApplicationSerivce, CurrencyPipe],
    bootstrap: [AppComponent],
    entryComponents: [ConfirmDeleteComponent]
})
export class AppModule { }
