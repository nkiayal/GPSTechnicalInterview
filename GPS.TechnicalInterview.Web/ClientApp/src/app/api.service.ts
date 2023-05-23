import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { ILoanApplication } from "./shared/models/application.model";

@Injectable({providedIn: 'root'})
export class ApiService {

    private readonly LOAN_BASE_URL = "api/ApplicationManager";
    private readonly headers = new HttpHeaders().set(
        "content-type",
        "application/json"
    );
    constructor(private http: HttpClient) { }

    //CRUD stuff
    getAllLoans(): Observable<ILoanApplication[]> {
        return this.http
            .get<ILoanApplication[]>(this.LOAN_BASE_URL, { headers: this.headers })
            .pipe(catchError(this.handleError));
    }

    getLoanRecord(applicationNumber: string): Observable<ILoanApplication> {
        return this.http
            .get<ILoanApplication>(`${this.LOAN_BASE_URL}/${applicationNumber}`, {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError));
    }

    createLoanRecord(application: ILoanApplication): Observable<ILoanApplication> {
        return this.http
            .post<ILoanApplication>(this.LOAN_BASE_URL, application, {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError));
    }

    updateLoanRecord( applicationNumber: string, record: ILoanApplication): Observable<ILoanApplication> {
        return this.http
            .put<ILoanApplication>(`${this.LOAN_BASE_URL}/${applicationNumber}`, record, {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError));
    }

    deleteLoanRecord(applicationNumber: string): Observable<void | object> {
        return this.http
            .delete(`${this.LOAN_BASE_URL}/${applicationNumber}`, {
                headers: this.headers,
            })
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse): Observable<any> {
        let errorMessage = `Failed: `;

        console.error(errorMessage, error);
        return throwError(errorMessage);
    }
}