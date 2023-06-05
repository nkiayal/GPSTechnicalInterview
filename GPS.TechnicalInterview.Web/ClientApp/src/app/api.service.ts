import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Application } from "src/models";

@Injectable({providedIn: 'root'})
export class ApiService {
    public dataSource: Application[] = [];
    private controllerUrl: string;

    constructor(
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string,
    ) {
        this.controllerUrl = this.baseUrl + 'applicationmanager';
    }

    public async getAllApplications(onSuccess?: () => void, onError?: () => void) {
        this.http.get(this.controllerUrl).subscribe((data: any) => {
            this.dataSource = data;
            if (onSuccess) onSuccess();
        }, () => {
            if (onError) onError();
        });
    }
    public async deleteApplication(applicationNumber: string, onSuccess?: () => void, onError?: () => void) {
        this.http.delete(`${this.controllerUrl}/${applicationNumber}`).subscribe((data: any) => {
            this.dataSource = this.dataSource.filter(({ applicationNumber: num }) => num !== applicationNumber);
            if (onSuccess) onSuccess();
        }, () => {
            if (onError) onError();
        });
    }
    public async editApplication(application: Application, onSuccess?: () => void, onError?: () => void) {
        this.http.put(`${this.controllerUrl}/${application.applicationNumber}`, application).subscribe((data: any) => {
            if (onSuccess) onSuccess();
        }, () => {
            if (onError) onError();
        });
    }
    public async createApplication(application: Application, onSuccess?: () => void, onError?: () => void) {
        this.http.post(this.controllerUrl, application).subscribe((data: any) => {
            if (onSuccess) onSuccess();
        }, () => {
            if (onError) onError();
        });
    }
}
