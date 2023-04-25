import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute, ParamMap } from "@angular/router";
import { ApiService } from "../api.service";
import { LoanApplication } from "../models/loanApplication";
import { Status } from "../models/status";

@Component({
  selector: "app-create-application",
  templateUrl: "./create-application.component.html",
  styleUrls: ["./create-application.component.scss"],
})
export class CreateApplicationComponent {
  public applicationForm: FormGroup;
  public statuses: Array<string> = ["New", "Approved", "Funded"];

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.applicationForm = this.formBuilder.group({
      firstName: [null],
      lastName: [null],
      phoneNumber: [null],
      email: [null],
      applicationNumber: [null],
      status: ["New"],
      amount: [null],
      monthlyPayAmount: [null],
      terms: [null],
    });
  }

  ngOnInit() {
    const applicationNumber: string =
      this.route.snapshot.paramMap.get("applicationNumber");

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
          amount:
            loanApp.loanTerms.amountDollars +
            loanApp.loanTerms.amountCents / 100,
          monthlyPayAmount:
            loanApp.loanTerms.monthlyPaymentAmountDollars +
            loanApp.loanTerms.monthlyPaymentAmountCents / 100,
          terms: loanApp.loanTerms.term,
        });
      });

  }
}
