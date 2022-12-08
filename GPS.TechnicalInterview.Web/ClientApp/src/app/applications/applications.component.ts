import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { ConfirmationComponent } from '../shared/confirmation/confirmation.component';
import { ILoanApplication } from '../shared/loan-interfaces';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit {
  public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status', 'actions']; 
  public loanApplications: BehaviorSubject<ILoanApplication[]> = new BehaviorSubject(null)

  constructor(
    private http: HttpClient, 
    private dialog: MatDialog,
    private router: Router
    ) { }

  public ngOnInit(): void {
    this.getLoanApplications()
  }

  public openApplication(loanApplication: ILoanApplication): void {
    this.router.navigate(['/create-application', {applicationNumber: loanApplication.ApplicationNumber}])
  }

  public deleteApplication(applicationToDelete: ILoanApplication): void {
    this.dialog
      .open(ConfirmationComponent, {
        data: {
          title: "Delete Application?",
          description: `Are you sure you want to delete this application?`,
          acceptMessage: "Delete",
          declineMessage: "Cancel"
        },
      })
      .afterClosed()
      .pipe(take(1))
      .subscribe((confirmed: boolean) => {
        if (confirmed) {
          const filteredApplications = this.loanApplications.getValue().filter((application: ILoanApplication) => {
            return application.ApplicationNumber !== applicationToDelete.ApplicationNumber;
          })
          this.loanApplications.next(filteredApplications)
          // Update JSON File Here
          // Never created C# crud calls before so I would need to learn that :)
        }
      });
  }

  private getLoanApplications(): void {
    // Larger codebase I would move http logic into its own service
    this.http.get('assets/mock-database.json').pipe(take(1)).subscribe((loanApplications: ILoanApplication[]) => {
      this.loanApplications.next(loanApplications)
    })
  }
}
