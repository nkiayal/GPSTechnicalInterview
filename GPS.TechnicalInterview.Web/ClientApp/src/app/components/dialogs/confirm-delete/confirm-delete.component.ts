import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

import { ApplicationsComponent } from '../../../applications/applications.component';

@Component({
    selector: 'app-confirm-delete',
    templateUrl: './confirm-delete.component.html',
    styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent {

    constructor(
        private dialogRef: MatDialogRef<ApplicationsComponent>
    ) { }

    onConfirm(): void {
        this.dialogRef.close(true);
    }
}