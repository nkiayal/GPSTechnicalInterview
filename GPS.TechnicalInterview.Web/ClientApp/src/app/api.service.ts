import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Application } from './interfaces/Application';

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.baseUrl + 'api/applicationmanager').pipe(catchError(this.handleError));
  }

  getApplication(applicationNumber: string): Observable<Application> {
    return this.http.get<Application>(this.baseUrl + `api/applicationmanager/${applicationNumber}`).pipe(
      map(applications => applications[0]),
      catchError(this.handleError)
    );
  }

  createApplication(application: Application): Observable<boolean> {
    return this.http.post<null>(this.baseUrl + 'api/applicationmanager', application).pipe(
      map(() => true),
      catchError(this.handleError)
    );
  }

  updateApplication(applicationNumber: string, application: Application): Observable<boolean> {
    return this.http.put<null>(this.baseUrl + `api/applicationmanager/${applicationNumber}`, application).pipe(
      map(() => true),
      catchError(this.handleError)
    );
  }

  deleteApplication(applicationNumber: string): Observable<boolean> {
    return this.http.delete<null>(this.baseUrl + `api/applicationmanager/${applicationNumber}`).pipe(
      map(() => true),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('A server error occurred: ', error);
    return throwError(new Error('A server error has occured.'));
  }
}
