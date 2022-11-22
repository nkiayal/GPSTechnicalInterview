import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsComponent implements OnInit{

    constructor(private apiService: ApiService) {}
    ngOnInit() {
        this.apiService.sendGetRequest("https://localhost:5001/applicationManager/getApps")
            .subscribe(data => { this.appArray = data; console.log("data: ", data); });
    }
    deleteApplication(id) {
        this.apiService.sendDeleteRequest("https://localhost:5001/applicationManager/" + id)
            .subscribe(data => { this.ngOnInit(); })

    }
    public displayedColumns: Array<string> = ['applicationNumber', 'amount', 'dateApplied', 'status']; 
    public appArray: Array<any> = [];
    public appStatus: Array<string> = ["New","Approved","Funded"]
}
