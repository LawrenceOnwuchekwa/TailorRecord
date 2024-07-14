import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(private snackBar: MatSnackBar) {}

  setErrorMessage(message: string) {
    this.errorMessageSubject.next(message);
    this.openSnackBar(message);
  }

  clearErrorMessage() {
    this.errorMessageSubject.next(null);
  }

  openSnackBar(message: string, cssClass: string = '') {
    const config: MatSnackBarConfig = {
      duration: 5000, // Duration in milliseconds
      panelClass: ['error-snackbar'] // Custom CSS class for styling
    };
    this.snackBar.open(message, 'Close', config);
  }
  

  handleHttpError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      if (error.error && typeof error.error === 'object') {
        if (error.error.errorMessage) {
          errorMessage = error.error.errorMessage;
        } else {
          const validationErrors = error.error;
          errorMessage = '';
          for (const key in validationErrors) {
            if (validationErrors.hasOwnProperty(key)) {
              errorMessage += `${key}: ${validationErrors[key]}\n`;
            }
          }
        }
      } else if (typeof error.error === 'string') {
        errorMessage = `Error: ${error.error}`;
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
    }
    this.setErrorMessage(errorMessage);
    return throwError(() => new Error(errorMessage));
  }


}
