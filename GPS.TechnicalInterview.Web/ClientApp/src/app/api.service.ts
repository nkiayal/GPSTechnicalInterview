import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Application } from "./Interfaces/applications.interface";

@Injectable({ providedIn: "root" })
export class ApiService {
  private apiUrl = "api/ApplicationManager";

  constructor(private http: HttpClient) {}

  getAllApplications() {
    return this.http.get<Application[]>(this.apiUrl);
  }

  getApplication(applicationNumber: string) {
    return this.http.get<Application>(`${this.apiUrl}/${applicationNumber}`);
  }

  createApplication(application: Application) {
    return this.http.post<Application>(this.apiUrl, application);
  }

  updateApplication(applicationNumber: string, application: Application) {
    return this.http.put<Application>(
      `${this.apiUrl}/${applicationNumber}`,
      application
    );
  }

  deleteApplication(applicationNumber: string) {
    return this.http.delete(`${this.apiUrl}/${applicationNumber}`);
  }
}
