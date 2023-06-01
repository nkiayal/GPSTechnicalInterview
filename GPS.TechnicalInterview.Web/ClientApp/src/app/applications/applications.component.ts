import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { Application } from '../interfaces/Application';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status', 'actions'];

  public applications: Application[] = [];

  constructor(api: ApiService) {
    api.getAllApplications().subscribe(applications => {
      console.log(applications);
      this.applications = applications;
    });
  }
}
