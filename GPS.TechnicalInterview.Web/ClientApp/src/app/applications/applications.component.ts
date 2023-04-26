import { Component } from "@angular/core";
import { ApiService } from "../api.service";
import { LoanApplication } from "../models/loanApplication";
import { MatDialog } from "@angular/material/dialog";
import { DeleteDialog } from "../delete-dialog/delete-dialog.component";
import { Status } from "../models/status";

@Component({
  selector: "app-applications",
  templateUrl: "./applications.component.html",
  styleUrls: ["./applications.component.scss"],
  providers: [ApiService],
})
export class ApplicationsComponent {
  loanApplications: LoanApplication[];

  public displayedColumns: Array<string> = [
    "applicationNumber",
    "amount",
    "dateApplied",
    "status",
    "dropdownMenu",
  ];

  constructor(private apiService: ApiService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadApplications();
  }

  private loadApplications() {
    this.apiService
      .getLoanApplications()
      .subscribe(
        (loanApplications) => (this.loanApplications = loanApplications)
      );
  }

  clickDeleteMenuItem(applicationNumber: string) {
    const dialogRef = this.dialog.open(DeleteDialog, {
      data: { applicationNumber },
    });

    dialogRef.afterClosed().subscribe((closeCode: string) => {
      if (closeCode === "Deleted") {
        this.loadApplications();
      }
    });
  }
}
