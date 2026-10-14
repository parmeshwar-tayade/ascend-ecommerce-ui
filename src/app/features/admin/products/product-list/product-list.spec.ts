import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductService } from '../../../../core/services/product-service';
import { ProductList } from './product-list';

describe('ProductList', () => {
  let component: ProductList;
  let fixture: ComponentFixture<ProductList>;
  let productService: any;

  beforeEach(async () => {
    productService = {
      getProducts: vi.fn().mockReturnValue(of([
        {
          id: 1,
          name: 'Laptop',
          price: 1200,
          description: 'Gaming laptop',
          imageUrl: 'https://example.com/laptop.jpg',
          categoryName: 'Electronics',
          available: true,
        }
      ]))
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule, ProductList],
      providers: [{ provide: ProductService, useValue: productService }],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductList);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products from the service and render them', () => {
    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products.length).toBe(1);
    expect(component.products[0].name).toBe('Laptop');
    expect(fixture.nativeElement.textContent).toContain('Laptop');
  });
});
