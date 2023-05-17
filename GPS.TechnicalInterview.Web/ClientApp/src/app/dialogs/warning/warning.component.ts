import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormField } from "@angular/material/form-field";

export interface DialogData {
  applicationNumber: string;
}

@Component({
  selector: "warning",
  templateUrl: "warning.component.html",
})
export class WarningComponent {
  constructor(
    public dialogRef: MatDialogRef<WarningComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCancelClicked(): void {
    this.dialogRef.close();
  }
}
