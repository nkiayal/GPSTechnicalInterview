import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { SnackbarService } from "./../../providers/snackbar.service";

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnDestroy {
    durationInSeconds: number = 5;
    message: string;
    show: boolean = false;

    private snackbarSubscription: Subscription
    constructor(private _snackBar: MatSnackBar, private _snackbarService: SnackbarService) { }

    ngOnInit(): void {
        this.snackbarSubscription = this._snackbarService.snackbarState
            .subscribe((state) => {
                this.message = state.message;
                if (state.show) {
                    this.openSnackBar()
                }
            })
    }

    ngOnDestroy() {
        this.snackbarSubscription.unsubscribe();
    }

    openSnackBar() {
        this._snackBar.open(this.message, '', { duration: this.durationInSeconds * 1000 })
    }
}