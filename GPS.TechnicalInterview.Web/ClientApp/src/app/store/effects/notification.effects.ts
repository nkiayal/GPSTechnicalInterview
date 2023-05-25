import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap } from "rxjs/operators";
import * as fromNotifyActions from "../actions/notification.actions";

export class NotificationEffects {
    createNotification = createEffect(() => this.actions$.pipe(
        ofType(fromNotifyActions.CREATE_NOTIFICATION),
        tap((action: fromNotifyActions.CreateNotification) =>
            this.snackBar.open.apply(null, [action.settings])
        )
    ));

    constructor(
        private actions$: Actions,
        private snackBar: MatSnackBar,
    ) { }
}