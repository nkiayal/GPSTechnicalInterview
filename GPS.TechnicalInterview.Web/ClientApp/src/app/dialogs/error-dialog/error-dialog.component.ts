import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

export interface ErrorData {
  error: any;
}

@Component({
  selector: "error-dialog",
  templateUrl: "./error-dialog.component.html",
})
export class ErrorDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorData
  ) {}

  onCloseClicked(): void {
    this.dialogRef.close();
  }
}
