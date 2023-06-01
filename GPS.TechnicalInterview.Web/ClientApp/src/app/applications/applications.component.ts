import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Application } from '../interfaces/Application';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status', 'actions'];

  public applications: Application[] = [];

  constructor(private api: ApiService, public dialog: MatDialog) {
    this.api.getAllApplications().subscribe(applications => {
      console.log(applications);
      this.applications = applications;
    });
  }

  openConfirmDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      minWidth: 600,
      data: {
        title: 'Delete Application',
        message: 'Are you sure you want to delete this application?',
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result: ', result);
    });
  }
}
