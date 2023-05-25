import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, switchMap, tap } from 'rxjs/operators';

import { ApiService } from "../../api.service";
import * as fromLoanActions from "../actions/application.actions";
import { CreateNotification } from "../actions/notification.actions";



@Injectable()
export class ApplicationsListEffects {

    loadAllApplications = createEffect(() => this.actions$.pipe(
        ofType(fromLoanActions.LOAD_ALL_APPLICATIONS),
        exhaustMap(action => this.apiService.getAllLoans()),
        map((res: any) => {
            if (res) {
                return new fromLoanActions.AllApplicationsLoaded({ list: res })
            } else {
                return new fromLoanActions.AllApplicationsLoaded({ list: [] })
            }
        })
    ));

    loadApplication = createEffect(() => this.actions$.pipe(
        ofType(fromLoanActions.LOAD_APPLICATION),
        exhaustMap((action: fromLoanActions.LoadApplication) => this.apiService.getLoanRecord(action.id)),
        map((res: any) => {
            if (res) {
                return new fromLoanActions.ApplicationLoaded( res)
            } else {
                return new fromLoanActions.ApplicationLoaded(null)
            }
        })
    ));

    createApplication = createEffect(() => this.actions$.pipe(
        ofType(fromLoanActions.CREATE_APPLICATION),
        exhaustMap((action: fromLoanActions.CreateApplication) =>
            this.apiService.createLoanRecord(action.applicationRecord)
        ),
        map(response => {
            if (response) {
                return new fromLoanActions.ApplicationCreated();
            }
        })
    ));

    applicationCreated = createEffect(() => this.actions$.pipe(
        ofType(fromLoanActions.APPLICATION_CREATED),
        switchMap((action) => [
            new CreateNotification([
                'Application Updated',
                'SUCCESS',
                {
                    horizontalPosition: 'right',
                    duration: 3000
                }
            ])
        ]),
        tap(() => { this.router.navigate(['/']); })
    ));

    updateApplication = createEffect(() => this.actions$.pipe(
        ofType(fromLoanActions.UPDATE_APPLICATION),
        exhaustMap((action: fromLoanActions.UpdateApplication) =>
            this.apiService.updateLoanRecord(action.applicationRecord)
        ),
        map(res => {
            if (res) {
                return new fromLoanActions.ApplicationUpdated();
            }
        })
    ));

    applicationUpdated = createEffect(() => this.actions$.pipe(
        ofType(fromLoanActions.APPLICATION_UPDATED),
        switchMap((action) => [
            new CreateNotification([
                'Application Updated',
                'SUCCESS',
                {
                    horizontalPosition: 'right',
                    duration: 3000
                }
            ])
        ]),
        tap(() => { this.router.navigate(['/']); })
    ));

    constructor(
        private actions$: Actions,
        private apiService: ApiService,
        private router: Router,
    ) { }
}