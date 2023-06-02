import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';
import { ApiService } from '../api.service';
import { Application, STATUSES } from '../interfaces/Application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  public statuses: Array<string> = STATUSES;
  public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status', 'actions'];

  public applications: Application[] = [];

  constructor(private api: ApiService, public dialog: MatDialog) {
    this.api.getAllApplications().subscribe(applications => {
      this.applications = applications;
    });
  }

  openConfirmDialog(applicationNumber: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: 600,
      data: {
        title: 'Delete Application',
        message: 'Are you sure you want to delete this application?',
      },
    });

    dialogRef.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.deleteApplication(applicationNumber);
      }
    });
  }

  deleteApplication(applicationNumber: string) {
    this.api.deleteApplication(applicationNumber).subscribe(result => {
      if (result) {
        this.applications = this.applications.filter(app => app.applicationNumber !== applicationNumber);
      }
    });
  }
}
