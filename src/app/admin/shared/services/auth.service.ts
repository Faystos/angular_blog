
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { User } from "../../../shared/interfaces";
import { environment } from "src/environments/environment";

@Injectable()

export class AuthService {
  constructor (private http: HttpClient) {}

  get token (): string | null {
    const expDate = new Date(localStorage.getItem('fb-token-exp') || '');
    if (new Date() > new Date(expDate)) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token-exp');
  }

  login = (user: User): Observable<any> => {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(this.setToken)
      )
  }

  logout = () => {
    this.setToken(null);
  }

  isAuthEnticated = (): boolean => {
    return !!this.token;
  }

  private setToken = (response: any) => {
    if (response) {
      const expDate = new Date(new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token', response.idToken);
      localStorage.setItem('fb-token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }
}


