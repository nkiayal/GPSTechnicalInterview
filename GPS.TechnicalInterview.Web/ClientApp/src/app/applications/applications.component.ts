import { Component, OnInit, Injectable, ViewChild } from "@angular/core";
import { ApiService } from "../api.service";
import { Application } from "../Interfaces/applications.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"],
})
@Injectable()
export class ApplicationsComponent implements OnInit {
  // @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  allApplications: Application[];

  public displayedColumns: Array<string> = [
    "applicationNumber",
    "amount",
    "dateApplied",
    "status",
    "menu",
  ];

  constructor(private apiService: ApiService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    try {
      this.allApplications = await this.apiService.getAllApplications();
    } catch (err) {
      console.log(err);
    }
  }

  onEditClicked(application: Application) {
    this.router.navigate(["/edit-application"], {
      queryParams: { appNumber: application.applicationNumber },
    });
  }

  onDeleteClicked(application: Application) {
    console.log(application.applicationNumber);
  }
}
