import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({providedIn: 'root'})
export class ApiService {
    private ApiUrl = 'http://localhost:3000/applications';

    constructor(private http: HttpClient) {}

    getApplications(): Observable<any[]> {
        return this.http.get<any[]>(this.ApiUrl);
    }

    saveApplication(application: any): Observable<any> {
        return this.http.post(this.ApiUrl, application);
    }
}