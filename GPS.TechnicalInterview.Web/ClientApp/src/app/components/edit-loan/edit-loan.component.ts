import { Component, OnInit } from "@angular/core";
import { } from '@angular/common'
import { ActivatedRoute, Router } from "@angular/router"
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { CurrencyPipe } from '@angular/common';

import { RequestorLoanApplicationSerivce } from "../../providers/requestor-loan-application.service";
import { SnackbarService } from "../../providers/snackbar.service";
import { ApplicationService } from "../../providers/application.service"
import { IApplication } from "../../interfaces/application.interface"
import { Status } from "../../interfaces/status.interface";

@Component({
    selector: "app-edit-loan",
    templateUrl: "./edit-loan.component.html",
    styleUrls: ["./edit-loan.component.scss"],
})
export class EditLoanComponent implements OnInit {
    id: string;
    application: IApplication;
    isEdit: boolean = false;

    public applicationForm: FormGroup;
    public statuses: Array<string> = ["NEW", "APPROVED", "FUNDED"];

    constructor(
        public _route: ActivatedRoute,
        public _router: Router,
        private _requestorLoanApplicationService: RequestorLoanApplicationSerivce,
        private formBuilder: FormBuilder,
        private _currencyPipe: CurrencyPipe,
        private _snackbarService: SnackbarService,
        private _applicationService: ApplicationService
    ) {
        this.applicationForm = this.formBuilder.group({
            firstName: [null, [Validators.required]],
            lastName: [null, [Validators.required]],
            phoneNumber: [null, [Validators.required, Validators.pattern(/^\d+$/)]],
            email: [null, [Validators.required, Validators.email]],
            applicationNumber: [null, [Validators.required]],
            status: ["NEW", [Validators.required]],
            amount: [null, [Validators.required,]],
            monthlyPayAmount: [this._currencyPipe.transform(0), [Validators.required]],
            terms: [null, [Validators.required]],
        });
        this.applicationForm.get('monthlyPayAmount').disable();

    }

    ngOnInit(): void {
        this._applicationService.currenApplication.subscribe((app) => {
            this.isEdit = app.isEdit;
            if (this.isEdit) {
                this.application = app.application;
                this.applicationForm.patchValue({ firstName: this.application.personalInformation.name.first })
                this.applicationForm.patchValue({ lastName: this.application.personalInformation.name.last })
                this.applicationForm.patchValue({ phoneNumber: this.application.personalInformation.phoneNumber })
                this.applicationForm.patchValue({ email: this.application.personalInformation.email })
                this.applicationForm.patchValue({ applicationNumber: this.application.applicationNumber })
                this.applicationForm.patchValue({ format: { value: this.application.applicationNumber, disabled: true } })
                this.applicationForm.patchValue({ status: Status[this.application.status] })
                this.applicationForm.patchValue({ amount: this.application.loanTerms.amount })
                this.applicationForm.patchValue({ monthlyPayAmount: this._currencyPipe.transform(this.application.loanTerms.monthlyPaymentAmount), disabled: true })
                this.applicationForm.patchValue({ terms: this.application.loanTerms.term })

                this.applicationForm.get('applicationNumber').disable();
                this.applicationForm.get('monthlyPayAmount').disable();
            }
        })

    }

    onSave() {
        if (this.applicationForm.valid) {
            if (this.isEdit) {
                this._requestorLoanApplicationService.updateLoanApplication(this.setApplication())
                    .subscribe((app) => {
                        this._snackbarService.show("Saved successfully.")
                        this._applicationService.resetApplication()
                        this._router.navigateByUrl("/")
                    })
            } else {
                this._requestorLoanApplicationService.createLoanApplication(this.setApplication())
                    .subscribe((app) => {
                        this._snackbarService.show("Created successfully.")
                        this._applicationService.resetApplication()
                        this._router.navigateByUrl("/")
                    })
            }
        } else {
            this.applicationForm.markAllAsTouched();
        }
    }

    onChange() {
        this.setMonthlyPaymentAmount();
    }

    setApplication(): IApplication {
        console.log('monthly pay', Number(this.applicationForm.getRawValue().monthlyPayAmount))
        return {
            applicationNumber: this.isEdit ? this.application.applicationNumber : this.applicationForm.getRawValue().applicationNumber,
            loanTerms: {
                amount: Number(this.applicationForm.getRawValue().amount),
                monthlyPaymentAmount: Number(this.applicationForm.getRawValue().monthlyPayAmount),
                term: Number(this.applicationForm.getRawValue().terms)
            },
            personalInformation: {
                name: {
                    first: this.applicationForm.getRawValue().firstName,
                    last: this.applicationForm.getRawValue().lastName
                },
                phoneNumber: this.applicationForm.getRawValue().phoneNumber,
                email: this.applicationForm.getRawValue().email
            },
            dateApplied: this.isEdit ? this.application.dateApplied : new Date().toLocaleDateString("en-US"),
            status: Number(Status[this.applicationForm.getRawValue().status.toUpperCase()])
        }
    }

    setMonthlyPaymentAmount(): void {
        const amount = this.applicationForm.getRawValue().amount ? Number(this.applicationForm.getRawValue().amount) : 0;
        const terms = this.applicationForm.getRawValue().terms ? this.applicationForm.getRawValue().terms : 1;

        const monthlyPaymentAmount = Math.ceil(amount / terms);

        this.applicationForm.patchValue({ monthlyPayAmount: monthlyPaymentAmount });

    }
}
