import { Component, OnInit, Injectable, ViewChild } from "@angular/core";
import { ApiService } from "../api.service";
import { Application } from "../Interfaces/applications.interface";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { WarningComponent } from "../dialogs/warning/warning.component";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"],
})
@Injectable()
export class ApplicationsComponent implements OnInit {
  allApplications: Application[];

  public displayedColumns: Array<string> = [
    "applicationNumber",
    "amount",
    "dateApplied",
    "status",
    "menu",
  ];

  constructor(
    private apiService: ApiService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.apiService
      .getAllApplications()
      .subscribe((applications) => (this.allApplications = applications));
  }

  async deleteApplication(application: Application): Promise<void> {
    try {
      await this.apiService.deleteApplication(application.applicationNumber);
      this.loadApplications();
    } catch (err) {
      console.log(err);
    }
  }

  onEditClicked(application: Application): void {
    this.router.navigate(["/edit-application"], {
      queryParams: { appNumber: application.applicationNumber },
    });
  }

  onDeleteClicked(application: Application): void {
    const dialogRef = this.dialog.open(WarningComponent, {
      width: "400px",
      data: { applicationNumber: application.applicationNumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteApplication(application);
    });
  }
}
