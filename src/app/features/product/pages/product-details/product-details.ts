import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import { Product } from '../../../../core/models/product.model';
import { CustomerProductService } from '../../../../core/services/customer-product-service';
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
  styleUrls: ['./product-details.css'],
  templateUrl: './product-details.html',
})
export class ProductDetails implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(AdminProductService);
  private readonly cdr = inject(ChangeDetectorRef);

  product: Product | null = null;
  loading = false;
  errorMessage = '';

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
      .pipe(finalize(() => {
        console.log('FINALIZE CALLED');
        this.loading = false;
      }))
      .subscribe({
        next: (product) => {
          console.log('API SUCCESS');
          
          const normalizedProduct = this.normalizeProduct(product);

          console.log('NORMALIZED', normalizedProduct);

          this.product = normalizedProduct;

          console.log('PRODUCT SET', this.product);
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error(err);
        },
        complete: () => {
          console.log('COMPLETED');
        }
      });
    }

  private normalizeProduct(product: Partial<Product> | null): Product | null {
    if (!product) {
      console.warn('Received null or undefined product:', product);
      return null;
    }
    console.log('Normalizing product:', product);
    const imageUrls: string[] = Array.isArray(product.imageUrls)
      ? product.imageUrls.filter((url): url is string => Boolean(url))
      : typeof (product as { imageUrl?: string }).imageUrl === 'string'
        ? [(product as { imageUrl?: string }).imageUrl].filter((url): url is string => Boolean(url))
        : [];

    const statusValue = typeof product.status === 'string'
      ? product.status
      : (product.status as { name?: string } | undefined)?.name ?? 'ACTIVE';

    return {
      ...product,
      productId: product.productId ?? (product as { id?: number }).id,
      productName: product.productName ?? 'Unnamed Product',
      price: product.price ?? 0,
      discountPrice: product.discountPrice ?? product.price ?? 0,
      imageUrls: imageUrls.length > 0 ? imageUrls : ['/assets/images/default-product.jpg'],
      status: statusValue,
      available: product.available ?? ((product.stockQuantity ?? 0) > 0),
    };
  }
}
