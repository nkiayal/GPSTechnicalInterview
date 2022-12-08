import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface IConfirmationDialogOptions {
  title: string;
  description?: string;
  acceptMessage?: string;
  declineMessage?: string;
}

@Component({
  selector: 'xenon-confirmation',
  styleUrls: ['./confirmation.component.scss'],
  template: `
    <div id="dialog-width">
      <p>{{ dialogData.title }}</p>
      <p>{{ dialogData.description }}</p>
      <div id="actions">
        <button *ngIf="dialogData.declineMessage" mat-flat-button (click)="dialogRef.close(false)">{{ dialogData.declineMessage }}</button>
        <button mat-flat-button color="primary" (click)="dialogRef.close(true)">{{ dialogData.acceptMessage }}</button>
      </div>
    </div>
  `,
})
export class ConfirmationComponent implements OnInit {
  constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: IConfirmationDialogOptions,
    public dialogRef: MatDialogRef<ConfirmationComponent>) {}

  public ngOnInit(): void {
    if (!this.dialogData) {
      this.dialogData = {
        title: "Untitled",
        description: '',
        acceptMessage: "Save",
        declineMessage: "Close"
      }
    }
  }
}
