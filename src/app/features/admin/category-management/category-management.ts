import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

import { Category } from '../../../core/models/category.model';
import { CategoryService } from '../../../core/services/category-service';

@Component({
  selector: 'app-category-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  styleUrl: './category-management.css',
  templateUrl: './category-management.html',
})
export class CategoryManagement implements OnInit {
  private readonly categoryService = inject(CategoryService);

  readonly categories = signal<Category[]>([]);
  readonly loading = signal(false);
  readonly errorMessage = signal('');
  readonly displayedColumns = ['id', 'name', 'description', 'actions'];

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Unable to load categories.');
        this.categories.set([]);
        this.loading.set(false);
      }
    });
  }
  deleteCategory(categoryId?: number): void {
    console.log('Delete clicked, id =', categoryId);

    if (categoryId == null) {
      console.error('Category ID is null or undefined');
      return;
    }

    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        console.log('Category deleted successfully');
        this.loadCategories();
      },
      error: (error) => {
        console.error('Delete failed:', error);
        this.errorMessage.set('Unable to delete category.');
      }
    });
  }
}
