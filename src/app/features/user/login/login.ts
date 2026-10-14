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
import { AuthService } from '../../../core/services/auth-service';
import { LoginRequest } from '../../../core/models/login.request.model';

@Component({
  selector: 'app-login',
  standalone: true,
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
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  hidePassword = true;

  loginForm: FormGroup = this.fb.group({
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],
    rememberMe: [false]
  });

  login(): void {

    if (this.loginForm.invalid) {

      this.loginForm.markAllAsTouched();
      return;

    }

    const loginRequest: LoginRequest = {

      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value

    };

    this.authService
      .login(loginRequest)
      .subscribe({

        next: (user) => {

          console.log('Login Success', user);

          const isAdmin = user.roles.some(
            role => role.role === 'ADMIN'
          );

          if (isAdmin) {

            this.router.navigate([
              '/admin/dashboard'
            ]);

          } else {

            this.router.navigate([
              '/'
            ]);

          }

        },

        error: (error) => {

          alert(
            'Login Failed. Please check your credentials and try again.'
          );

          console.error(
            'Login Failed',
            error
          );

        }

      });

  }
}

