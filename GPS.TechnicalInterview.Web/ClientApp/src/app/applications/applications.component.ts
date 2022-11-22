import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit{
    @ViewChild('dialogRef')
    dialogRef!: TemplateRef<any>;
    constructor(private apiService: ApiService, public dialog: MatDialog) {}
    ngOnInit() {
        this.apiService.sendGetRequest("https://localhost:5001/applicationManager/getApps")
            .subscribe(data => { this.appArray = data; console.log("data: ", data); });
    }
    openDialog(appNum) {
        const myTempDialog = this.dialog.open(this.dialogRef, { data: appNum});
        myTempDialog.afterClosed().subscribe((res) => { console.log({ res });
        });
    }
    deleteApplication(id) {
        this.apiService.sendDeleteRequest("https://localhost:5001/applicationManager/" + id)
            .subscribe(data => { this.ngOnInit(); })

    }
    public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status']; 
    public appArray: Array<any> = [];
    public appStatus: Array<string> = ["New","Approved","Funded"]
}
