import { Component, OnInit } from "@angular/core";

import { RequestorLoanApplicationSerivce } from "./providers/requestor-loan-application.service";
import { SnackbarComponent } from "./components/snackbar/snackbar.component";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["app.component.scss"],
})
export class AppComponent {
    title = "app";

    constructor(
        public _requestorLoanApplicationService: RequestorLoanApplicationSerivce
    ) { }

    ngOnInit() {
        this._getLoanApplications();
    }

    _getLoanApplications() {
        return this._requestorLoanApplicationService.getLoanApplications()
    }
}
