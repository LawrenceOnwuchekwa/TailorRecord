import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { merge } from 'rxjs';

@Component({
  selector: 'tailorapp-signup',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

}
