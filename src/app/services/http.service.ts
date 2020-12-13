import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    headers: HttpHeaders = new HttpHeaders();
    fileHeaders: HttpHeaders = new HttpHeaders();

    constructor(private http: HttpClient,
    ) { }

    handleErrors = (err) => {
        if (err.status === 401) {
        } else {
            if (err?.error?.inputValid) err.error.message = err.error.errors[0];
            return throwError(err);
        }
    };

    FileUpload(url: string, body: Object = {}, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.post(url, body, { headers: this.fileHeaders, params })
            .pipe(catchError(this.handleErrors));
    }

}
