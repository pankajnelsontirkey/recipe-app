import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: "root" })
export class AuthService {
  authUrls = {
    signUp: "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=",
    signIn:
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
  };
  apiKey = "AIzaSyAopDsq1EtBA_sxIriHpcYmEWKNLxmPvWw";

  constructor(private http: HttpClient) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.authUrls.signUp}${this.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError));
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${this.authUrls.signIn}${this.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage: string = "An error occurred.";
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "The email is already registered.";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "The email is not registered.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "The password you entered is invalid.";
    }
    return throwError(errorMessage);
  }
}
