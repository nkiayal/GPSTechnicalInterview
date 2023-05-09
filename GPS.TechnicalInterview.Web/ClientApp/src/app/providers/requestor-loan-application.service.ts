import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { IApplication } from "../interfaces/application.interface";

const API_BASE_URL = environment.API_BASE_URL;

@Injectable({
    providedIn: "root",
})
export class RequestorLoanApplicationSerivce {
    constructor(public http: HttpClient) { }

    createLoanApplication(application: any) {
        const url = `${API_BASE_URL}/application`;

        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            }),
        };

        return this.http.post(url, application, httpOptions);
    }

    getLoanApplications() {
        const url = `${API_BASE_URL}/ApplicationManager`;

        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            }),
        };

        return this.http.get(url, httpOptions);
    }

    updateLoanApplication(application: any) {
        const url = `${API_BASE_URL}/application/${application.applicationNumber}`;

        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            }),
        };

        return this.http.put(url, application, httpOptions);
    }

    deleteLoanApplication(id: string) {
        const url = `${API_BASE_URL}/application/${id}`;

        const httpOptions = {
            headers: new HttpHeaders({
                "Content-Type": "application/json",
            }),
        };

        return this.http.delete(url, httpOptions);
    }
}
