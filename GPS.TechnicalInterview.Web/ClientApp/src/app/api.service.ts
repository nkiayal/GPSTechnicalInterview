import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoanI } from "./loanInterface";

@Injectable({providedIn: 'root'})
export class ApiService {
    private httpHeaders = {
        headers: new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', ['http://localhost:5000', 'https://localhost:5001']),
    };
    constructor(private http: HttpClient) {
    }
    public sendGetRequest(url, params = null): Observable<any> {
        var obj = { ...this.httpHeaders }
        if (params !== null) {
            obj['params'] = new HttpParams(params)
        }
        return this.http.get(url, obj)
    };
    public sendPutRequest(url, body): Observable<any> {
        return this.http.put(url, body)
    }
    public sendPostRequest(url, data): Observable<any> {
        return this.http.post(url, data, this.httpHeaders)
    }
    public sendDeleteRequest(url): Observable<any> {
       return this.http.delete(url)
    }
}