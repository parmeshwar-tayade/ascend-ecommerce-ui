import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ProductService } from '../../../../core/services/product-service';
import { CreateProduct } from './create-product';

describe('CreateProduct', () => {
  let component: CreateProduct;
  let fixture: ComponentFixture<CreateProduct>;
  let productService: any;

  beforeEach(async () => {
    productService = {
      createProduct: vi.fn().mockReturnValue(of({
        id: 1,
        name: 'Laptop',
        price: 1200,
        description: 'Gaming laptop'
      }))
    };

    await TestBed.configureTestingModule({
      imports: [CreateProduct],
      providers: [{ provide: ProductService, useValue: productService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
