import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ApplicationsComponent } from "./pages/applications/applications.component";
import { CreateApplicationComponent } from "./pages/create-application/create-application.component";

export const routes: Routes = [
  { path: "", redirectTo: "/applications", pathMatch: "full" },
  { path: "applications", component: ApplicationsComponent },
  { path: "create-application", component: CreateApplicationComponent },
  { path: "edit-application", component: CreateApplicationComponent },
  { path: "**", redirectTo: "/applications" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
