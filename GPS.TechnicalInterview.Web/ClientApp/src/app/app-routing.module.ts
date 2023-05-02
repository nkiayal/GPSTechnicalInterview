import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ApplicationsComponent } from "./applications/applications.component";
import { EditLoanComponent } from "./components/edit-loan/edit-loan.component";

export const routes: Routes = [
    { path: "", redirectTo: "/applications", pathMatch: "full" },
    { path: "applications", component: ApplicationsComponent },
    { path: "edit-application/:id", component: EditLoanComponent },
    { path: "create-application", component: EditLoanComponent },
    { path: "**", redirectTo: "/applications" },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})

export class AppRoutingModule { }
