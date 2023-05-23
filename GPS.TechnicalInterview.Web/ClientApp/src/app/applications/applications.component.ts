import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { EStatus, ILoanApplication } from '../shared/models/application.model';
import { LoadAllApplications } from '../store/actions/application.actions';
import { applicationsList } from '../store/selectors/application.selector';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit, OnDestroy {

	public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status', 'action'];
	public loanRecordsData: ILoanApplication[] = [];
	public listSubscription: Subscription;

	constructor(public store: Store<any>) {
		
	}

	ngOnInit() {
		this.store.dispatch(new LoadAllApplications())

		this.listSubscription = this.store.select(applicationsList).pipe().subscribe(data => {
			this.loanRecordsData = data;
		})
	}

	displayStatusName(i: number):string {
		return EStatus[i]
	}

	deleteApplication() {

	}

	public ngOnDestroy(): void {
		this.listSubscription.unsubscribe()
	}
}
