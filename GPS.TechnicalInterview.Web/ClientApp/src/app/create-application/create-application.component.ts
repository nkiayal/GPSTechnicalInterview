import { Component, OnInit, Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ApiService } from "../api.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-create-application",
  templateUrl: "./create-application.component.html",
  styleUrls: ["./create-application.component.scss"],
})
@Injectable()
export class CreateApplicationComponent implements OnInit {
  applicationNumber: string;
  public applicationForm: FormGroup;
  public statuses: Array<string> = ["New", "Approved", "Funded"];

  constructor(
    private formBuilder: FormBuilder,
    private apiService: ApiService,
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

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe((params) => {
      if (params['appNumber']) {
        this.applicationNumber = params['appNumber'];
        console.log(this.applicationNumber);
      }
    });
  }
}
