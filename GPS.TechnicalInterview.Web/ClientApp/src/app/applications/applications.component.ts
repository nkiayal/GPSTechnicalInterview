import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {

  applications: any[] = []; // to store applications
  public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status', 'actions']; 

  constructor(private apiService: ApiService) {}

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
}