import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { AppRoutingModule } from './app-routing.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { ApplicationsComponent } from './applications/applications.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    ModalDialogComponent,
    NavMenuComponent,
    ApplicationsComponent,
    CreateApplicationComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
  ],
  providers: [
    ApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
