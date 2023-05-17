import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Application } from "./interfaces/applications.interface";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class ApiService {
  private readonly BASE_URL = "api/ApplicationManager";
  private readonly headers = new HttpHeaders().set(
    "content-type",
    "application/json"
  );

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = `Something bad happened`;
    if (error.error instanceof ErrorEvent) {
      // client-side
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getAllApplications(): Observable<Application[]> {
    return this.http
      .get<Application[]>(this.BASE_URL, { headers: this.headers })
      .pipe(catchError(this.handleError));
  }

  getApplication(applicationNumber: string): Observable<Application> {
    return this.http
      .get<Application>(`${this.BASE_URL}/${applicationNumber}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  createApplication(application: Application): Observable<Application> {
    return this.http
      .post<Application>(this.BASE_URL, application, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  updateApplication(
    applicationNumber: string,
    application: Application
  ): Observable<Application> {
    return this.http
      .put<Application>(`${this.BASE_URL}/${applicationNumber}`, application, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }

  deleteApplication(applicationNumber: string): Observable<void | object> {
    return this.http
      .delete(`${this.BASE_URL}/${applicationNumber}`, {
        headers: this.headers,
      })
      .pipe(catchError(this.handleError));
  }
}
