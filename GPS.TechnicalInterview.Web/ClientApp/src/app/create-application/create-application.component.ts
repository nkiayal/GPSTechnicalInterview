import { Component, OnInit, Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "../api.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Application } from "../Interfaces/applications.interface";

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
    private router: Router
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

  ngOnInit(): void {
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
    } catch (err) {
      console.log(err);
    }
  }

  async onSaveClicked() {
    if (this.applicationForm.valid) {
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
      } else {
        this.apiService.updateApplication(
          this.applicationNumber,
          applicationData
        );
      }
      this.router.navigate(["/"]);
    }
  }
}
