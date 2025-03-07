import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap, throwError } from "rxjs";

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

    updateApplication(applicationNumber: string, updatedApplication: any): Observable<any> {
        return this.http.get<any[]>(this.ApiUrl).pipe(
          switchMap((applications) => {
            const application = applications.find(app => app.applicationNumber === applicationNumber);
            if (!application) {
              return throwError(() => new Error('Application not found'));
            }
            return this.http.put(`${this.ApiUrl}/${application.id}`, updatedApplication);
          })
        );
      }
}