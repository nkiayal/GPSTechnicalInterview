import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { Application } from "../Interfaces/applications.interface";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"],
})
export class ApplicationsComponent implements OnInit {
  allApplications: Application[] = [];

  public displayedColumns: Array<string> = [
    "applicationNumber",
    "amount",
    "dateApplied",
    "status",
  ];

  constructor(private apiService: ApiService) {
    this.apiService
      .getAllApplications()
      .subscribe((data: Application[]) => (data = this.allApplications));
  }

  ngOnInit(): void {
    console.log(this.allApplications);
    console.log(this.allApplications.toString());
    for (let item of this.allApplications) {
      console.log(item);
    }
  }
}
