import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Application } from "./interfaces/applications.interface";

const headers = new HttpHeaders().set("content-type", "application/json");
const BASE_URL = "api/ApplicationManager";
@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  getAllApplications() {
    return this.http.get<Application[]>(BASE_URL, { headers: headers });
  }

  async getApplication(applicationNumber: string) {
    return this.http
      .get<Application>(`${BASE_URL}/${applicationNumber}`, {
        headers: headers,
      })
      .toPromise();
  }

  async createApplication(application: Application) {
    return this.http
      .post<Application>(BASE_URL, application, {
        headers: headers,
      })
      .toPromise();
  }

  async updateApplication(applicationNumber: string, application: Application) {
    return this.http
      .put<Application>(`${BASE_URL}/${applicationNumber}`, application, {
        headers: headers,
      })
      .toPromise();
  }

  async deleteApplication(applicationNumber: string) {
    return this.http
      .delete(`${BASE_URL}/${applicationNumber}`, {
        headers: headers,
      })
      .toPromise();
  }
}
