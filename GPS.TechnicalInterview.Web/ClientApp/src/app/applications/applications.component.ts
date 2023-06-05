import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent {

  public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status', 'actionMenu'];
  public statuses: Array<string> = ['New', 'Approved', 'Funded'];

  constructor(
    private api: ApiService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.api.getAllApplications();
  }

  public formatDate(date: any) {
    return (new Date(date)).toLocaleDateString();
  }
  public formatCost(cost: any) {
    return `$${(Number(cost ?? 0) / 100).toFixed(2)}`;
  }

  public get dataSource() {
    return this.api.dataSource;
  }
  
  public openDeleteDialog(applicationIndex: number) {
    let application = this.api.dataSource[applicationIndex];
    this.dialog.open(ModalDialogComponent, {
      width: '600px',
    }).afterClosed().subscribe(result => {
      if (result === true) {
        this.api.deleteApplication(application.applicationNumber);
      }
    });
  }
}
