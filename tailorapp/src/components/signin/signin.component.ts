import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { HeaderComponent } from "../header/header.component";
import { AuthService } from '../../service/Auth/auth.service';
import { Router } from '@angular/router';
import { ErrorHandlingService } from '../../service/Error/error-handling.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'tailorapp-signup',
    standalone: true,
    templateUrl: './signin.component.html',
    styleUrl: './signin.component.css',
    imports: [MatFormFieldModule, MatInputModule, FormsModule, HeaderComponent, CommonModule]
})
export class SignupComponent {
    username = '';
    password = '';
    errorMessage$: Observable<string | null>;
  
    constructor(private authService: AuthService, private router: Router,
      private errorHandlingService: ErrorHandlingService
    ) {
      this.errorMessage$ = this.errorHandlingService.errorMessage$;
  }
  
    onSubmit() {
      this.errorHandlingService.clearErrorMessage(); // Clear previous errors
      this.authService.login(this.username, this.password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          if(err.status == 401){
            this.errorHandlingService.setErrorMessage('Unauthorized: Invalid credentials.');}
            else{
              this.errorHandlingService.setErrorMessage('Login failed. Please check your credentials and try again.');
            }
          // Handle login failure
          //this.errorHandlingService.setErrorMessage('Login failed. Please check your credentials and try again.');
        }
      });
    }

    ngOnDestroy() {
      this.errorHandlingService.clearErrorMessage(); // Clear error on component destroy
    }
    }
