import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ApiService } from "../api.service";
import { LoanApplication } from "../models/loanApplication";
import { Status } from "../models/status";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-create-application",
  templateUrl: "./create-application.component.html",
  styleUrls: ["./create-application.component.scss"],
})
export class CreateApplicationComponent {
  public applicationForm: FormGroup;
  public statuses: Array<string> = ["New", "Approved", "Funded"];
  public createMode: boolean

  constructor(
    public snackBar: MatSnackBar,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.applicationForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.minLength(9), Validators.maxLength(9)]],
      email: [null, Validators.email],
      applicationNumber: [null, Validators.required],
      status: ["New", Validators.required],
      amount: [null, [Validators.required, Validators.min(0.01)]],
      monthlyPayAmount: [null],
      terms: [null, [Validators.required, Validators.min(1)]],
    });
  }


  ngOnInit() {
    this.createMode = this.router.url === '/create-application';

    const applicationNumber: string =
      this.route.snapshot.paramMap.get("applicationNumber");

    if (applicationNumber) {
      this.apiService
        .getLoanApplicationByNumber(applicationNumber)
        .subscribe((loanApp) => {
          console.debug(loanApp)
          
          this.applicationForm.setValue({
            firstName: loanApp.personalInformation.name.first,
            lastName: loanApp.personalInformation.name.last,
            phoneNumber: loanApp.personalInformation.phoneNumber,
            email: loanApp.personalInformation.email,
            applicationNumber: loanApp.applicationNumber,
            status: Status[loanApp.status],
            amount: loanApp.loanTerms.amount,
            monthlyPayAmount: loanApp.loanTerms.monthlyPaymentAmount,
            terms: loanApp.loanTerms.term,
          });
        });
    }
  }

  calculateMonthlyPaymentAmount() {
    if (this.applicationForm && this.applicationForm.get("amount").value > 0.01 && this.applicationForm.get("terms").value > 0) {
       this.applicationForm.patchValue({
        monthlyPayAmount: this.applicationForm.get("amount").value / this.applicationForm.get("terms").value
       })
    }
    else {
      this.applicationForm.patchValue({monthlyPayAmount: ""})
    }
  }

  submitApplication() {
    if (this.applicationForm.valid) {
      const loanApp = this.convertFormControlsToLoanApplication();

      if (this.router.url === "/create-application") {
        this.apiService.createLoanApplication(loanApp).subscribe();
        this.snackBar.open("Created Successfully", "OK", {duration: 3000})
      }
      else {
        this.apiService.updateLoanApplication(loanApp).subscribe();
        this.snackBar.open("Saved Successfully", "OK", {duration: 3000})
      }
    }
  }

  convertFormControlsToLoanApplication(): LoanApplication {
    const formControlValues = this.applicationForm.value;

    const loanApplication: LoanApplication = {
      applicationNumber: formControlValues.applicationNumber,
      loanTerms: {
        amount: formControlValues.amount,
        monthlyPaymentAmount: formControlValues.monthlyPayAmount,
        term: formControlValues.terms
      },
      personalInformation: {
        name: {
          first: formControlValues.firstName,
          last: formControlValues.lastName
        },
        email: formControlValues.email,
        phoneNumber: formControlValues.phoneNumber
      },
      dateApplied: new Date(),
      status: Status[<string>formControlValues.status]
    } 

    return loanApplication;
  }
}
