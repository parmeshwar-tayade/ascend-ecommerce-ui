import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RegisterRequest } from '../../../core/models/register.request.model';
import { UserService } from '../../../core/services/user-service';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  private fb = inject(FormBuilder);
  private readonly userService=inject(UserService);
  private readonly router= inject(Router)

  hidePassword = true;
  hideConfirmPassword = true;

  registerForm: FormGroup = this.fb.group(
    {
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/)
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ],

      confirmPassword: [
        '',
        [
          Validators.required,
        ]
      ],

      termsAccepted: [
        false,
        Validators.requiredTrue
      ]
    },
    {
      validators: this.passwordMatchValidator()
    }







);

  submit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const registerRequest: RegisterRequest = {
      firstName: this.registerForm.controls['firstName'].value!,
      lastName: this.registerForm.controls['lastName'].value!,
      email: this.registerForm.controls['email'].value!,
      password: this.registerForm.controls['password'].value!,
      phoneNumber: this.registerForm.controls['phoneNumber'].value ?? undefined
    };

    this.userService.register(registerRequest).subscribe({
      next: (response) => {
        console.log('Registration successful', response);

        // Navigate to login page
        alert("Registration successful, please login.");
        this.router.navigate(['/user/login']);
      },
      error: (error) => {
        console.error('Registration failed', error);
        console.error('Status:', error.status);
        console.error('Message:', error.error);

        alert("Registration failed, service unavailable: " + error.error.message);
      }
    });
  }

  private passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmPassword = control.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword
        ? null
        : { passwordMismatch: true };
   };
  }
}
