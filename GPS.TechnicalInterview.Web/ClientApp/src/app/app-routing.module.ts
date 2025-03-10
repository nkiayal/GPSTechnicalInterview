import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationsComponent } from './applications/applications.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { EditApplicationComponent } from './edit-application/edit-application.component';

export const routes: Routes = [
  { path: '', redirectTo: '/applications', pathMatch: 'full' },
  { path: 'applications', component: ApplicationsComponent },
  { path: 'create-application', component: CreateApplicationComponent },
  { path: 'edit-application/:applicationNumber', component: EditApplicationComponent },
  { path: '**', redirectTo: '/applications'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }