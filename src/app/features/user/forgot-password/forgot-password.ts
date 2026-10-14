import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth-service'; 

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './forgot-password.html',
})
export class ForgotPassword {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loading = false;
  successMessage = '';
  errorMessage = '';

  forgotPasswordForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {

    if (this.forgotPasswordForm.invalid) {
      this.forgotPasswordForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    this.authService
      .forgotPassword(this.forgotPasswordForm.getRawValue())
      .subscribe({
        next: (res) => {
          this.loading = false;
          this.successMessage =
            res.message || 'Password reset link sent successfully.';
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage =
            err.error?.message || 'Failed to send reset link.';
        }
      });
  }
}