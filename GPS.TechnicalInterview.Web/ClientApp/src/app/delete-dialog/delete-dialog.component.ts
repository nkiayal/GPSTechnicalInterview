import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialog implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {applicationNumber: string}, private apiService: ApiService, public dialogRef: MatDialogRef<DeleteDialog>) { }

  async confirmDelete() {
    //This needs to be awaited otherwise the applications component may update its list of applications faster than this application is deleted 
    await this.apiService.deleteLoanApplication(this.data.applicationNumber).toPromise();
    this.dialogRef.close("Deleted");
  }

  cancelDelete() {
    this.dialogRef.close("Cancelled");
  }

  ngOnInit(): void {
  }

}
