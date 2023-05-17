import { Component, OnInit, Injectable, ViewChild } from "@angular/core";
import { ApiService } from "../../api.service";
import { Application } from "../../interfaces/applications.interface";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { WarningComponent } from "../../dialogs/warning-dialog/warning.component";
import { ErrorDialogComponent } from "src/app/dialogs/error-dialog/error-dialog.component";

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
    this.apiService.getAllApplications().subscribe(
      (applications: Application[]) => {
        this.allApplications = applications;
      },
      (err: any) => {
        this.dialog.open(ErrorDialogComponent, {
          width: "600px",
          data: { error: err },
        });
      }
    );
  }

  async deleteApplication(application: Application): Promise<void> {
    try {
      await this.apiService
        .deleteApplication(application.applicationNumber)
        .toPromise();
      this.loadApplications();
    } catch (err) {
      this.dialog.open(ErrorDialogComponent, {
        width: "600px",
        data: { error: err },
      });
    }
  }

  onEditClicked(application: Application): void {
    this.router.navigate(["/edit-application"], {
      queryParams: { appNumber: application.applicationNumber },
    });
  }

  onDeleteClicked(application: Application): void {
    const dialogRef = this.dialog.open(WarningComponent, {
      width: "600px",
      data: { applicationNumber: application.applicationNumber },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.deleteApplication(application);
    });
  }
}
