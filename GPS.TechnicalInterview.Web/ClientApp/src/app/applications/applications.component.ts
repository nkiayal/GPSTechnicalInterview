import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

import { IApplication } from '../interfaces/application.interface';
import { RequestorLoanApplicationSerivce } from "../providers/requestor-loan-application.service";
import { SnackbarService } from "../providers/snackbar.service";
import { ConfirmDeleteComponent } from "../components/dialogs/confirm-delete/confirm-delete.component";
import { ApplicationService } from "../providers/application.service"
import { Status } from "../interfaces/status.interface";


@Component({
    selector: "app-applications",
    templateUrl: "./applications.component.html",
    styleUrls: ["./applications.component.scss"],
})
export class ApplicationsComponent {
    public applications: IApplication[];

    public displayedColumns: Array<string> = [
        "applicationNumber",
        "amount",
        "dateApplied",
        "status",
        "actions",
    ];

    private snackbarSubscription: Subscription;

    constructor(
        public _requestorLoanAppliationService: RequestorLoanApplicationSerivce,
        public _router: Router,
        public dialog: MatDialog,
        private _snackbarService: SnackbarService,
        private _applicationService: ApplicationService,
        private _currencyPipe: CurrencyPipe
    ) { }

    ngOnInit() {
        this._getApplications();
    }

    _getApplications(): void {
        this._requestorLoanAppliationService
            .getLoanApplications()
            .subscribe((apps: IApplication[]) => (this.applications = apps));
    }

    editApplication(id: string, app: any): void {
        this._applicationService.changeApplication(true, app);
        this._router.navigate(['/edit-application/', id]);
    }

    deleteApplication(id: string): void {
        let dialogConfig = new MatDialogConfig;
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = false;

        let dialogRef = this.dialog.open(ConfirmDeleteComponent, { width: "630px" });


        dialogRef.afterClosed()
            .subscribe(confirmed => {
                if (confirmed) {
                    this._requestorLoanAppliationService.deleteLoanApplication(id)
                        .subscribe((response) => {
                            this._snackbarService.show("Deleted Successfully")
                            this._getApplications();
                        });


                }
            });
    }

    convertToCurrency(amount: number) {
        return this._currencyPipe.transform(amount)
    }

    convertToStatus(status: string): string {
        return Status[status]
    }
}
