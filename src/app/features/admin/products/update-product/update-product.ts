import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { Category } from '../../../../core/models/category.model';
import { Product } from '../../../../core/models/product.model';
import { AdminProductService } from '../../../../core/services/admin-product-service';
import { CategoryService } from '../../../../core/services/category-service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSlideToggleModule
  ],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct implements OnInit {

  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(AdminProductService);
  private readonly categoryService = inject(CategoryService);

  readonly categories = signal<Category[]>([]);

  productId: number | null = null;
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    productName: ['', Validators.required],
    description: [''],

    price: [0, [Validators.required, Validators.min(0)]],

    discountPrice: [0],

    stockQuantity: [0, [Validators.required, Validators.min(0)]],

    sku: [''],

    brand: [''],

    imageUrls: [''],

    categoryName: ['', Validators.required],

    status: ['ACTIVE', Validators.required],

    isFeatured: [false],

    available: [true]
  });

  ngOnInit(): void {
    this.loadCategories();

    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));

      if (!id) {
        this.errorMessage = 'Invalid Product Id';
        return;
      }

      this.productId = id;
      this.loadProduct(id);
    });
  }

  private loadCategories(): void {
    this.categoryService.getCategories().subscribe({
      next: categories => {
        this.categories.set(categories ?? []);
      },
      error: () => {
        this.errorMessage = 'Unable to load categories';
      }
    });
  }

  private loadProduct(id: number): void {
    this.productService.getProductByIdForAdmin(id).subscribe({
      next: product => {

        this.form.patchValue({
          productName: product.productName ?? '',
          description: product.description ?? '',
          price: Number(product.price ?? 0),
          discountPrice: Number(product.discountPrice ?? 0),
          stockQuantity: Number(product.stockQuantity ?? 0),
          sku: product.sku ?? '',
          brand: product.brand ?? '',
          imageUrls: product.imageUrls?.join(', ') ?? '',
          categoryName: product.categoryName ?? '',
          status: product.status ?? 'ACTIVE',
          isFeatured: product.isFeatured ?? false,
          available: product.available ?? true
        });
      },
      error: () => {
        this.errorMessage = 'Unable to load product';
      }
    });
  }

  submit(): void {

    if (this.form.invalid || this.productId === null) {
      this.form.markAllAsTouched();
      return;
    }

    const imageUrls = (this.form.value.imageUrls ?? '')
      .split(',')
      .map(url => url.trim())
      .filter(Boolean);

    const payload: Product = {
      productName: this.form.value.productName ?? '',
      description: this.form.value.description ?? '',

      price: Number(this.form.value.price),

      discountPrice: Number(this.form.value.discountPrice ?? 0),

      stockQuantity: Number(this.form.value.stockQuantity),

      sku: this.form.value.sku ?? '',

      brand: this.form.value.brand ?? '',

      imageUrls,

      categoryName: this.form.value.categoryName ?? '',

      status: this.form.value.status ?? 'ACTIVE',

      isFeatured: this.form.value.isFeatured ?? false,

      available: this.form.value.available ?? true,

      updatedAt: new Date().toISOString()
    };

    this.productService.updateProduct(this.productId, payload).subscribe({
      next: () => {
        this.router.navigate(['/admin/products']);
      },
      error: () => {
        this.errorMessage =
          'Unable to update product. Please try again.';
      }
    });
  }

onImagesSelected(event: Event): void {

    const input = event.target as HTMLInputElement;

    if (!input.files?.length) {
        return;
    }

    const currentValue = this.form.controls.imageUrls.value ?? '';

    const existingImages = currentValue
        .split(',')
        .map(image => image.trim())
        .filter(Boolean);

    const selectedImages = Array.from(input.files).map(
        file => `/assets/images/${file.name}`
    );

    const allImages = [
        ...existingImages,
        ...selectedImages
    ];

    this.form.patchValue({
        imageUrls: allImages.join(', ')
    });

    input.value = '';
    }
}