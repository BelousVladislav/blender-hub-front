import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
    constructor(
        private _router: Router
    ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token = localStorage.getItem('access_token');
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + token
                }
            });
        }
        return next.handle(req).pipe(
            catchError(
                (error) => this.handleAuthError(error)
            )
        );
    }

    private handleAuthError(error: HttpErrorResponse): Observable<any> {
        if (error.status == 401) {
            this._router.navigate(['/', 'auth', 'authentication'], {
                queryParams: {
                    sessionClose: true
                }
            });
        }
        return throwError(error);
    }
}
