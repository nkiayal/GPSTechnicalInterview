import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteApplicationComponent } from '../delete-application/delete-application.component';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  applications: any[] = []; // to store applications
  public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status', 'actions']; 

  constructor(private apiService: ApiService, private snackBar: MatSnackBar, private dialog: MatDialog) {}

    ngOnInit(): void {  
      this.fetchApplications();
   }

   fetchApplications(): void { 
    this.apiService.getApplications().subscribe({
      next: (data) => {
        this.applications = data;
      },
      error: (err) => console.error('Error fetching applications data')
    });
  }

  openDeleteDialog(applicationNumber: string): void {
    const dialogRef = this.dialog.open(DeleteApplicationComponent, {
      width: '350px',
      data: { applicationNumber }
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.deleteApplication(applicationNumber);
      }
    });
  }

  deleteApplication(applicationNumber: string): void {
    this.apiService.deleteApplication(applicationNumber).subscribe(() => {
      this.snackBar.open('Application deleted successfully.', 'Close', { duration: 3000 });
      this.applications = this.applications.filter(app => app.applicationNumber !== applicationNumber);
    });
  }
}