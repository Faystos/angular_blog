import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from '../admin/shared/services/auth.service';

@Injectable()

export class AuthIntercepros implements HttpInterceptor {
    constructor(
        private auth: AuthService,
        private router: Router
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthEnticated()) {
            req = req.clone({
                setParams: {
                    auth: this.auth.token
                }
            });
        }
    return next.handle(req)
        .pipe(
            tap(() => {
                console.log('intercept');
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.logout();
                    this.router.navigate(['/admin', 'login']);
                }
                return throwError(error);
            })
        );
    }
}
