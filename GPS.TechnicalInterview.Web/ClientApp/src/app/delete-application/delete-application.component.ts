import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-application',
  templateUrl: './delete-application.component.html',
  styleUrls: ['./delete-application.component.scss']
})
export class DeleteApplicationComponent {
  applicationNumber: string = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteApplicationComponent>
  ) {}

  ngOnInit(): void {
    //  Get data from dialog reference
    const dialogData: any = this.dialogRef._containerInstance._config.data;
    if (dialogData && dialogData.applicationNumber) {
      this.applicationNumber = dialogData.applicationNumber;
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
