import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

// Libraries
import { APP_EFFECTS } from './store';

//Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

// Components
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { ApplicationsComponent } from './applications/applications.component';
import { EffectsModule } from '@ngrx/effects';
import { ApplicationsReducer } from './store/reducers/application.reducers';
import { ApplicationFormService } from './shared/services/applicationForm.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ApplicationsComponent,
    CreateApplicationComponent
  ],
  imports: [
      BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
      StoreModule.forRoot({}),
      StoreModule.forFeature('applications', ApplicationsReducer),
      StoreDevtoolsModule.instrument({
          name: 'GPS Assessment',
          maxAge: 100
      }),
      EffectsModule.forRoot(APP_EFFECTS),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    MatIconModule,
    MatMenuModule
  ],
    providers: [
        ApplicationFormService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
