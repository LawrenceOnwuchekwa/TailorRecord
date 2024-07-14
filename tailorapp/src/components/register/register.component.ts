import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/Auth/auth.service';
import { Router, RouterModule } from '@angular/router';
import { ErrorHandlingService } from '../../service/Error/error-handling.service';
import { Observable, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'tailorapp-register',
  standalone: true,
  imports: [FormsModule,RouterModule,CommonModule,ReactiveFormsModule,],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  errorMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private errorHandlingService: ErrorHandlingService,
    private router: Router
  ) {
    this.errorMessage$ = this.errorHandlingService.errorMessage$;
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { username, password } = this.registrationForm.value;
      this.errorHandlingService.clearErrorMessage();
      this.authService.signup(username, password).pipe(
        tap(() => {
          console.log('Registration successful');
          this.router.navigate(['/dashboard']);
        })
      ).subscribe({
        error: (err: any) => {
          // Handle registration failure
          this.errorHandlingService.setErrorMessage('Registration failed. Please check your details and try again.');
        }
        });
    } else {
      console.error('Invalid form data. Please check the fields.');
    }
  }
  ngOnDestroy() {
    this.errorHandlingService.clearErrorMessage(); // Clear error on component destroy
  }
  
  get username() { return this.registrationForm.get('username'); }
  get password() { return this.registrationForm.get('password'); }
}

