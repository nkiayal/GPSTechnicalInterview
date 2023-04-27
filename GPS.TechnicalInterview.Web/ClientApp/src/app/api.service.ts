import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { LoanApplication } from "./models/loanApplication";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  getLoanApplicationByNumber(
    applicationNumber: string
  ): Observable<LoanApplication> {
    const options = applicationNumber
      ? {
          ...httpOptions,
          params: new HttpParams().set(
            "loanApplicationNumber",
            applicationNumber
          ),
        }
      : {};

    return this.http
      .get<LoanApplication>(
        "/ApplicationManager/GetLoanApplicationByNumber",
        options
      )
      .pipe(catchError(this.handleError));
  }

  getLoanApplications(): Observable<LoanApplication[]> {
    return this.http
      .get<LoanApplication[]>(
        "/ApplicationManager/GetLoanApplications",
        httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  deleteLoanApplication(applicationNumber: string): Observable<unknown> {
    const options = applicationNumber
      ? {
          params: new HttpParams().set(
            "loanApplicationNumber",
            applicationNumber
          ),
        }
      : {};

    return this.http
      .delete(`/ApplicationManager/DeleteLoanApplication`, options)
      .pipe(catchError(this.handleError));
  }

  createLoanApplication(application: LoanApplication): Observable<unknown> {
    return this.http
      .post("/ApplicationManager/CreateLoanApplication", application)
      .pipe(catchError(this.handleError));
  }

  updateLoanApplication(application: LoanApplication): Observable<unknown> {
    return this.http
      .put("/ApplicationManager/UpdateLoanApplication", application)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error("An error occurred", error.error);
    } else {
      console.error(
        `Server returned error code ${error.status}, body is: `,
        error.error
      );
    }

    return throwError(
      () => new Error(`Something went wrong, please try again`)
    );
  }
}
