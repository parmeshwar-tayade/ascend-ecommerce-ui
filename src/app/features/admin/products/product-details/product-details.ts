import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { Product } from '../../../../core/models/product.model';
import { AdminProductService } from '../../../../core/services/admin-product-service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './product-details.html',
  styleUrls: ['./product-details.css'],
})
export class ProductDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(AdminProductService);
  private readonly cdr = inject(ChangeDetectorRef);

  product: Product | null = null;
  loading = false;
  errorMessage = '';

  get discountPercentage(): number {
    if (
      !this.product ||
      !this.product.price ||
      !this.product.discountPrice ||
      this.product.discountPrice >= this.product.price
    ) {
      return 0;
    }

    return Math.round(
      ((this.product.price - this.product.discountPrice) /
        this.product.price) *
        100
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));

      if (!id || Number.isNaN(id)) {
        this.errorMessage = 'Invalid product id.';
        return;
      }

      this.loadProduct(id);
    });
  }

  private loadProduct(productId: number): void {
    this.loading = true;
    this.errorMessage = '';
    this.product = null;

    this.productService
      .getProductByIdForAdmin(productId)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (product) => {
          this.product = this.normalizeProduct(product);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Failed to load product details.';
          this.cdr.detectChanges();
        },
      });
  }

  private normalizeProduct(
    product: Partial<Product> | null
  ): Product | null {
    if (!product) {
      return null;
    }

    const imageUrls: string[] = Array.isArray(product.imageUrls)
      ? product.imageUrls.filter(
          (url): url is string => Boolean(url)
        )
      : typeof (product as { imageUrl?: string }).imageUrl === 'string'
      ? [(product as { imageUrl?: string }).imageUrl!]
      : [];

    const statusValue =
      typeof product.status === 'string'
        ? product.status
        : (product.status as { name?: string } | undefined)?.name ??
          'ACTIVE';

    return {
      ...product,
      productId:
        product.productId ??
        (product as { id?: number }).id,
      productName:
        product.productName ?? 'Unnamed Product',
      price: product.price ?? 0,
      discountPrice:
        product.discountPrice ?? product.price ?? 0,
      imageUrls:
        imageUrls.length > 0
          ? imageUrls
          : ['/assets/images/default-product.jpg'],
      status: statusValue,
      available:
        product.available ??
        ((product.stockQuantity ?? 0) > 0),
    } as Product;
  }
}