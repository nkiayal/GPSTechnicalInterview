import { Component, OnInit, Injectable } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { ApiService } from "../api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Application } from "../Interfaces/applications.interface";
import { SnackBar } from "../shared/ux-components/snack-bar/snack-bar.component";

@Component({
  selector: "app-create-application",
  templateUrl: "./create-application.component.html",
  styleUrls: ["./create-application.component.scss"],
})
@Injectable()
export class CreateApplicationComponent implements OnInit {
  applicationNumber: string;
  public applicationForm: FormGroup;
  public statuses: Array<number> = [0, 1, 2];
  newApplication: Boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: SnackBar
  ) {
    this.applicationForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, this.validatePhoneNumber()],
      email: [null, Validators.email],
      applicationNumber: [null, Validators.required],
      status: [0],
      amount: [null, (Validators.required, this.validateNumber())],
      monthlyPayAmount: [null],
      terms: [null, (Validators.required, this.validateNumber())],
    });
  }

  ngOnInit(): void {
    this.subscribeToAmountAndTermChange();

    this.route.queryParams.subscribe((params) => {
      this.applicationNumber = params["appNumber"];
    });

    if (this.applicationNumber === undefined) return;
    this.newApplication = false;
    this.loadApplication();
  }

  async loadApplication(): Promise<void> {
    try {
      const applicationData = await this.apiService.getApplication(
        this.applicationNumber
      );
      this.applicationForm.patchValue({
        firstName: applicationData.personalInformation.name.first,
        lastName: applicationData.personalInformation.name.last,
        phoneNumber: applicationData.personalInformation.phoneNumber,
        email: applicationData.personalInformation.email,
        applicationNumber: applicationData.applicationNumber,
        status: applicationData.status,
        amount: applicationData.loanTerms.amount,
        monthlyPayAmount: applicationData.loanTerms.monthlyPaymentAmount,
        terms: applicationData.loanTerms.term.toString(),
      });
      this.applicationForm.get("applicationNumber")?.disable();
    } catch (err) {
      console.log(err);
    }
  }

  subscribeToAmountAndTermChange() {
    const amountControl = this.applicationForm.get("amount");
    const termControl = this.applicationForm.get("terms");
    const monthlyPayAmountControl =
      this.applicationForm.get("monthlyPayAmount");

    amountControl?.valueChanges.subscribe(() => this.calculateMonthlyPayment());
    termControl?.valueChanges.subscribe(() => this.calculateMonthlyPayment());

    monthlyPayAmountControl?.disable();
  }

  calculateMonthlyPayment() {
    const amount = this.applicationForm.get("amount")?.value;
    const term = this.applicationForm.get("terms")?.value;
    const monthlyPayAmount = amount / term;
    console.log(monthlyPayAmount);

    if (isNaN(monthlyPayAmount) || monthlyPayAmount === Infinity) return;

    this.applicationForm.patchValue({
      monthlyPayAmount: monthlyPayAmount.toFixed(2),
    });
  }

  async onSaveClicked() {
    if (this.applicationForm.invalid) {
      this.applicationForm.markAllAsTouched();
      return;
    }
    const formData = this.applicationForm.value;

    const applicationData: Application = {
      applicationNumber: formData.applicationNumber,
      loanTerms: {
        amount: formData.amount,
        monthlyPaymentAmount: formData.monthlyPayAmount,
        term: formData.terms,
      },
      personalInformation: {
        name: {
          first: formData.firstName,
          last: formData.lastName,
        },
        phoneNumber: formData.phoneNumber,
        email: formData.email,
      },
      dateApplied: new Date(),
      status: formData.status,
    };
    if (this.newApplication) {
      this.apiService.createApplication(applicationData).then((response) => {
        console.log("Application created", response);
      });
      this.snackBar.openSnackBar("Created successfully", "OK");
    } else {
      this.apiService.updateApplication(
        this.applicationNumber,
        applicationData
      );
      this.snackBar.openSnackBar("Saved successfully", "OK");
    }
    this.router.navigate(["/"]);
  }

  validatePhoneNumber() {
    return (control: AbstractControl): ValidationErrors | null => {
      const phoneNumber = control.value;
      const phoneRegex = /^[0-9]{10}$/;

      return phoneRegex.test(phoneNumber)
        ? null
        : { phoneNumber: "Phone number must contain exactly 10 digits" };
    };
  }

  validateNumber() {
    return (control: AbstractControl): ValidationErrors | null => {
      const number = control.value;
      return isNaN(number) ? { number: "not a number" } : null;
    };
  }
}
