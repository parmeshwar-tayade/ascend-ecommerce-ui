import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Category } from '../../../../core/models/category.model';
import { CategoryService } from '../../../../core/services/category-service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create-category.html',
  styleUrl: './create-category.css'
})
export class CreateCategory {
  private readonly fb = inject(FormBuilder);
  private readonly categoryService = inject(CategoryService);
  private readonly router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    categoryName: ['', Validators.required],
    description: ['']
  });

  submitted = false;
  errorMessage = '';

  submit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: Category = {
      categoryName: this.form.value.categoryName ?? '',
      description: this.form.value.description ?? ''
    };

    this.categoryService.createCategory(payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/categories']);
      },
      error: () => {
        this.errorMessage = 'Unable to create category. Please try again.';
      }
    });
  }
}
