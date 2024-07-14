import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { APP_SERVICE_CONFIG } from '../../app/AppConfig/appconfig.service';
import { AppConfig } from '../../app/AppConfig/appconfig.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Observable, throwError } from 'rxjs';
import { ErrorHandlingService } from '../Error/error-handling.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // BehaviorSubject to keep track of the authentication state
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  // Observable to expose the authentication state
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    @Inject(APP_SERVICE_CONFIG) private config: AppConfig,
    private http: HttpClient,
    private router: Router,
    private errorHandlingService:ErrorHandlingService,
    @Inject(DOCUMENT) private document: Document
  ) {
    const localStorage = document.defaultView?.localStorage;
    // Check if token exists in local storage on service initialization
    if (localStorage) {
      const token = localStorage.getItem('authToken');
      if (token) {
        this.isAuthenticatedSubject.next(true);
      }
    }
  }

  // Method to handle user login
  login(username: string, password: string) {
    return this.http
      .post<{ token: string }>(`${this.config.apiEndpoint}/login`, {
        username,
        password,
      })
      .pipe(
        // Use the tap operator to perform side effects
        tap((response) => {
          // Save the token and update the authentication state
          localStorage.setItem('authToken', response.token);
          // Update the authentication state
          this.isAuthenticatedSubject.next(true);
          this.errorHandlingService.clearErrorMessage();
        }),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      );
  }

  logout() {
    // Remove the token from local storage
    localStorage.removeItem('authToken');
    // Update the authentication state
    this.isAuthenticatedSubject.next(false);
    // Navigate to the home page
    this.router.navigate(['/home']);
  }

  signup(username: string, password: string){
      return this.http
        .post<{ token: string }>(`${this.config.apiEndpoint}/register`, {
          username,
          password,
        })
        .pipe(
          // Use the tap operator to perform side effects
          tap((response) => {
            // Save the token and update the authentication state
            localStorage.setItem('authToken', response.token);
            // Update the authentication state
            this.isAuthenticatedSubject.next(true);
            this.errorHandlingService.clearErrorMessage();
          }),
          catchError((error: HttpErrorResponse) => this.handleError(error))
        );
    }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value; // Return the current authentication state
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    this.errorHandlingService.handleHttpError(error);
    return throwError(() => new Error(error.message));
  }
}
